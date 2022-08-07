# Lunch order

Бота для сбора заявок на обед

Команды

| команда          | доступ | параметры              | действие                                                               |
| ---------------- | ------ | ---------------------- | ---------------------------------------------------------------------- |
| `/menu`          | all    | -                      | выводит меню                                                           |
| `/help`          | all    | -                      | выводит подсказку по командам                                          |
| `/list_admin`    | all    | -                      | выводит список админов                                                 |
|                  |        |                        |                                                                        |
| `/start`         | admin  | -                      | запускает опрос                                                        |
| `/set_poll_time` | admin  | _number_ `<time>`      | устанавливает время для опроса в секундах (от 10 до 600 сек)           |
|                  |        |                        |                                                                        |
| `/add_admin`     | admin  | _string_ `<@username>` | добавляет админа                                                       |
| `/add_remove`    | admin  | _string_ `<@username>` | удаляет админа                                                         |
| `/up` + document | admin  | _string_ `cafe\|users` | устанавливает меню или данные пользователей, документ должен быть json |

Зависимоси

- telegraf - фреймворек для telegram
- effector - управления состоянием
- effector-storage - сохранение состояния
- simple-json-db - запись json на диск

Формат для обновлиня данных

Меню

```json
{
  "food": {
    "salad": "Салат",
    "sup": "Суп"
  },
  "menu": [
    {
      "combo": ["salad"],
      "price": 130
    },
    {
      "combo": ["sup"],
      "price": 130
    },
    {
      "combo": ["salad", "sup"],
      "price": 250
    }
  ],
  "optimization": []
}
```

Пользовалети

```json
[
  {
    "name": "Михаил Грозный",
    "tel": "+7(ххх)ххх-хх-хх",
    "bank": "Царская казна"
  }
]
```

Переменные окружения для конфигурирования бота

```ini
TELEGRAM_BOT_TOKEN="TELEGRAM_TOKEN"
ADMIN_USERNAME="ADMIN_USERNAME"
```
