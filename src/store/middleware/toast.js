const toast = (store) => (next) => (action) => {
    if(action.type === 'error') {
        console.log('error here', action);
    }
    return next(action);
}
export default toast;