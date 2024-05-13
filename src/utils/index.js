export const datavalidationerror = (error) => {
    if (error && error.response && error.response.data && error.response.data.data_validation_errors && error.response.data.data_validation_errors.length > 0) {
        return error.response.data.data_validation_errors[0].msg;
    } else if (error && error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    } else {
        return 'An unexpected error occurred.';
    }
};

export const successToast = (response) => {
    if (response && response.data && response.data.message) {
        return response?.data?.message;
    } else {
        return "Success message not available.";
    }
}
