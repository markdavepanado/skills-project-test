import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isJWTtoken = token.length < 500; // check if token is from jwt
    let decodedData;

    if (token && isJWTtoken) {
      decodedData = jwt.verify(token, "authToken");
      req.userId = decodedData?.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "You need an access to proceed" });
    }

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export default auth;
