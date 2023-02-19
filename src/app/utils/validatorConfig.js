export const validatorConfig = {
    email: {
        isRequired: {
            message: "e-mail обязательно для заполнения"
        },
        isEmail: {
            message: "email введен не верно"
        }
    },
    password: {
        isRequired: {
            message: "Пароль обязательно для заполнения"
        },
        isCapitalSymbol: {
            message: "Должна быть заглавная буква"
        },
        isContainDigit: {
            message: "Должна быть цифра"
        },
        min: {
            message: "Должно быть не менее 8 символов",
            value: 8
        }
    },
    profession: {
        isRequired: {
            message: "Необходимо выбрать профессию"
        }
    },
    licence: {
        isRequired: {
            message: "Необходимо согласиться"
        }
    }
};
