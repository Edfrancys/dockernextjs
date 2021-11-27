import { GetServerSideProps } from "next"
import prisma from "../lib/prismaClient"

export default function Home({ users }: any) {

    return (
        <div>
            {users.map((user: any) => (
                <div key={user.uuid}>
                    {user.name}
                    {
                        user.enderecos.map((enderecos: any) => (
                            <div key={enderecos.uuid}>
                                - {enderecos.rua}, {enderecos.numero}, {enderecos.complemento} <br />
                            </div>
                        ))
                    }<br /><br />

                </div>
            ))}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {


    const getUsers = await prisma.users.findMany({
        include: {
            enderecos: true
        }
    })

    console.log(getUsers);


    if (async () => await prisma.$disconnect)
        console.log("Conecção encerrada");


    const users = JSON.parse(JSON.stringify(getUsers))

    return {
        props: { users }
    }
}
