// Підключаємо необхідний модуль MongoDB
const { MongoClient } = require('mongodb');

// URL з'єднання з вашою базою даних MongoDB
const url = 'mongodb://localhost:27017';

// Назва бази даних
const dbName = 'language_courses';

// Функція для виконання запиту до бази даних
async function main() {
    // Створюємо новий клієнт MongoDB
    const client = new MongoClient(url);

    try {
        // Підключаємося до сервера MongoDB
        await client.connect();

        console.log("Connected to the MongoDB server");

        // Отримуємо доступ до колекції "courses" з бази даних
        const db = client.db(dbName);
        const coursesCollection = db.collection('courses');

        // Виконуємо запит до колекції "courses"
        const courses = await coursesCollection.find().toArray();

        // Виводимо результати запиту
        console.log("Courses:");
        console.log(courses);
    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Закриваємо з'єднання з сервером MongoDB
        await client.close();
    }
}

// Викликаємо функцію main() для виконання запиту
main();
