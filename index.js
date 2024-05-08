const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'language_courses';

async function runAggregation() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        const db = client.db(dbName);

        // Агрегація: кількість студентів на кожному курсі
        const courseStudentsAggregation = await db.collection('students').aggregate([
            { $unwind: "$courses" },
            { $group: { _id: "$courses", total_students: { $sum: 1 } } }
        ]).toArray();
        console.log("Course Students Aggregation:");
        console.log(courseStudentsAggregation);

        // Агрегація: середній вік студентів на кожному курсі
        const courseAverageAgeAggregation = await db.collection('students').aggregate([
            { $unwind: "$courses" },
            { $group: { _id: "$courses", average_age: { $avg: "$age" } } }
        ]).toArray();
        console.log("Course Average Age Aggregation:");
        console.log(courseAverageAgeAggregation);

        // Агрегація: кількість студентів на кожному курсі для рівня Intermediate
        const intermediateCourseStudentsAggregation = await db.collection('students').aggregate([
            { $match: { level: "Intermediate" } },
            { $unwind: "$courses" },
            { $group: { _id: "$courses", total_students: { $sum: 1 } } }
        ]).toArray();
        console.log("Intermediate Course Students Aggregation:");
        console.log(intermediateCourseStudentsAggregation);

        // Агрегація: кількість курсів, які веде кожен вчитель
        const teacherCoursesCountAggregation = await db.collection('teachers').aggregate([
            { $unwind: "$courses" },
            { $group: { _id: "$name", total_courses: { $sum: 1 } } }
        ]).toArray();
        console.log("Teacher Courses Count Aggregation:");
        console.log(teacherCoursesCountAggregation);

        // Агрегація: топ-5 найпопулярніших курсів
        const topPopularCoursesAggregation = await db.collection('students').aggregate([
            { $unwind: "$courses" },
            { $group: { _id: "$courses", total_students: { $sum: 1 } } },
            { $sort: { total_students: -1 } },
            { $limit: 5 }
        ]).toArray();
        console.log("Top Popular Courses Aggregation:");
        console.log(topPopularCoursesAggregation);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await client.close();
    }
}

// Виклик функції для виконання агрегацій
runAggregation();
