const messages = {
    'POST_CREATED_SUCCESSFULLY': 'Post created successfully',
    'QUERY_ERROR': 'Something went wrong with the query. Check your parameter data types as well as the query itself',
    'POST_DELETED_SUCCESSFULLY': 'Post deleted successfully!',
    'NOT_AUTHORIZED': 'You are not authorized to execute this action!',
    'DELETE_METHOD_LOGIC_ERROR': 'Something went wrong. Check the delete post method logic.',
    'POST_LIKE_SUCCESS': 'Post liked successfully',
    'CHECK_LIKE_POST_LOGIC': 'Something went wrong. Check the like post method logic',
    'NOT_IMPLEMENTED_MESSAGE': 'This method is not implemented yet',
    'POST_FETCHED_SUCCESS': 'Post successfully fetched',
    'POST_FETCH_ERROR': 'Something went wrong, it is likely that a post with such ID does not exist. Check again',
    'USERNAME_TAKEN': 'This username is already taken',
    'REGISTRATION_SUCCESSFUL': 'User successfully registered',
    'REGISTRATION_ERROR': 'Internal server error: Something went wrong with the fetching. Check database connection',
    'LOGIN_SUCCESS': 'Login successful!',
    'WRONG_PASSWORD': 'Wrong password!',
    'USER_NOT_FOUND': 'A user with such a username does not exist in our database.',
    'USER_DELETE_SUCCESS': 'User deleted successfully',
    'USER_DELETE_ERROR': 'Internal server error. Something went wrong when trying to delete that user',
    'USER_DELETE_NOT_FOUND': 'The user you are trying to delete does not exist',
    'PASSWORD_CRITERIA_NOT_MET': 'This password does not match the criteria. The password should be at least 8 characters long. It should include at least one upper-case letter and at least one special character.',
    'USER_REGISTERED': 'The current user instance is registered',
    'USER_NOT_REGISTERED': 'The current user instance is not registered',
    'INTERNAL_SERVER_ERROR': 'Something went wrong on the server-side, check the backend code.',
    'RATE_LIMIT_MESSAGE': 'It seems like you are performing a certain action too rapidly in short time periods. Try again later.'
}

module.exports = messages