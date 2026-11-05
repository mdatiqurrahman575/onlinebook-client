import { authClient } from "./auth-client"

const getTokenFromServer = async () => {
    const {data, error} = await authClient.token();

    const token = data?.token;

    return token

}