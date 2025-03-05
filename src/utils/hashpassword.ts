
import * as bcrypt from 'bcrypt';

export const saltOrRounds = 10;


const hashpassword = async(password:string): Promise<string> => {
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
}
const isMatchPassword = async(password:string,hash:string): Promise <boolean> => {
    return  await bcrypt.compare(password, hash);
}
export { hashpassword,isMatchPassword};