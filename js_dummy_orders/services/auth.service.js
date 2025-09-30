import config from "../config/config.js"

const { AUTH_SERVICE_URL } = config

export async function Authenticate(token) {
    const resp = await fetch(AUTH_SERVICE_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            authToken: token
        })
    })
    const data = await resp.json()

    if (resp.status == 401 || data.success == false) {
        const error = Error(data.message)
        error.name = "authenticationError"
        throw error
    } else {
        return data.user
    }
}

export async function AuthHandler(req, res, next) {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token required"
      });
    }

    const user = await Authenticate(token);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    req.USER_ID = user.id
    req.USERNAME = user.username
    req.USER_ROLE = user.role

    next();
    
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
}