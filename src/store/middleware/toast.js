const toast = (store) => (next) => (action) => {
    if(action.type === 'error') {
        console.log('error here', action);
    }
    next(action);
}
export default toast;