import {NextApiHandler} from 'next';
import {addIngredient, getUser} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    getUser(req.body.email);
    res.send('success');
}

export default handler;
