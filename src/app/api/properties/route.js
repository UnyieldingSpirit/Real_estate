import { NextResponse } from 'next/server';
import axios from 'axios';

// URL вашего бэкенда
const BACKEND_URL = 'http://localhost:8080';

export async function GET(request) {
  try {
    // Получаем все параметры запроса
    const { searchParams } = new URL(request.url);
    const params = {};

    // Копируем все параметры запроса
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log('Отправка запроса к:', `${BACKEND_URL}/api/properties`);

    // Вызываем бэкенд с таймаутом и параметрами
    const response = await axios.get(`${BACKEND_URL}/api/properties`, {
      params,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log('Ответ получен:', response.status);

    // Возвращаем данные
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Ошибка API маршрута:', error.message);

    // Возвращаем подробную информацию об ошибке
    return NextResponse.json(
      {
        success: false,
        message: 'Ошибка при получении объявлений',
        error: error.message,
        details: error.response ? {
          status: error.response.status,
          data: error.response.data,
        } : null,
      },
      { status: error.response?.status || 500 },
    );
  }
}