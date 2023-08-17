//API endpoint to create a new prisma user
import {NextApiHandler} from 'next';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

module.exports = async (req, res) => {
    try {
        const email = req.body.data.email;
        console.log("email is: "+email);
        const users = await prisma.users.create({
            data: {email: email, ingredients: null, recipes: null, password: ""}
        });
    } catch (err) {
        console.log(err);
    } finally {
        await prisma.$disconnect();
        res.send({ received: true });
    }
};

