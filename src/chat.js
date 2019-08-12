import { ApiAiClient } from 'api-ai-javascript';
import { createStore, applyMiddleware } from 'redux';

const accessToken = '99493c58e04b4253abbbc20b8c5642a3';
const client = new ApiAiClient({ accessToken });

const ON_MESSAGE = 'ON_MESSAGE';

export const sendMessage = (text, sender = 'anonymous') => ({
    type: ON_MESSAGE,
    payload: { text, sender }
});

const messageMiddleWare = () => next => action => {
    next(action);

    if (action.type === ON_MESSAGE) {
        const { text } = action.payload;
        client.textRequest(text).then(onSuccess)

        function onSuccess(response) {
            const { result: { fulfillment } } = response;
            next(sendMessage(fulfillment.speech, 'bot'));
        }
    }
};

const initState = [{ text: "I'm Bots", sender: 'anonymous' }];

const messageReducer = (state = initState, action) => {
    switch (action.type) {
        case ON_MESSAGE:
            return [...state, action.payload]
        default:
            return state;
    }
};

export const store = new createStore(messageReducer, applyMiddleware(messageMiddleWare))
