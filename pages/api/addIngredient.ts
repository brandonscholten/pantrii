import {NextApiHandler} from 'next';
import {addIngredient} from '../../utils/utils';

const handler: NextApiHandler = async (req, res) => {
    addIngredient(req.body.ingredient);
    res.send('success');
}

export default handler;
