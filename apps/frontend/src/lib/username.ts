
const extractUsername = (url: string): string => {

    const { pathname } = new URL(url);
    const username = pathname.split("/")[1];
    
    return username;
};

export default extractUsername;
