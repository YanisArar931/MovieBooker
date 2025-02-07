function generateToken(user) {
    const userString = JSON.stringify(user);
    const token = btoa(userString);
    return token;
}

function verifyToken(token) {
    try {
        const userString = atob(token);
        return JSON.parse(userString);
    } catch (error) {
        console.error("token invalide !");
        return null;
    }
}

const user = {
    id: 1,
    username: "YanisAR",
    email: "yanis@gmail",
    role: "admin"
};

const token = generateToken(user);
console.log("token :", token);

const decodedUser = verifyToken(token);
console.log("Utilisateur décodé :", decodedUser);
