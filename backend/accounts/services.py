from .repository import create_user, get_user_by_email
from .utils import hash_password


def register_user(user_data):

    # Check if email already exists
    existing_user = get_user_by_email(user_data["email"])

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists."
        }

    # Hash the password before saving
    user_data["password"] = hash_password(user_data["password"])

    # Save user to MongoDB
    create_user(user_data)

    # Return success response
    return {
        "success": True,
        "message": "User registered successfully."
    }