import { Geolocation, Company, Product } from ".prisma/client"
import { GetServerSideProps } from "next"
import prisma from "../../lib/prismaClient"

import Link from "next/link"
import { useRouter } from "next/router"

import styles from '../../styles/Home/Home.module.css'



interface CompanyExtencion extends Company {
    geolocation: Geolocation[]
    product: Product[]
    company: Company
}

export default function Home({ company }: any) {

    console.log('products', company);


    return (
        <div className={styles.boxUserBody} >

            <div className={styles.boxUser} key={company.uuid}>

                <section className={styles.flexRow}>
                    <div className={styles.image} >
                        <img src="https://venngage-wordpress.s3.amazonaws.com/uploads/2019/04/Travel-Tour-Business-Logo.png" />
                    </div>
                    <div className={styles.contain}>
                        <p>{company.nomeFantasia}</p>

                        <p>
                            {
                                company.geolocation.map((geolocation: Geolocation) => (
                                    <div key={geolocation.uuid}>
                                        <p>
                                            -{geolocation.rua}, <br />
                                            <span className={styles.small}>
                                                {geolocation.cep}, {geolocation.complemento}
                                            </span>
                                        </p>

                                    </div>
                                ))
                            }
                        </p>
                        <p>Quantidade de Produtos Cadastrados: <span className={styles.badge}>{company.product.length}</span></p>
                    </div>
                </section>





            </div>

        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {




    const uuiQuery = ctx.query.id?.toString()

    const getCompany = await prisma.company.findFirst({
        where: {
            uuid: uuiQuery
        },
        include: {
            product: true,
            geolocation: true,
        }

    })
    console.log(getCompany?.product.length);
    const company = JSON.parse(JSON.stringify(getCompany))

    return {
        props: { company }
    }
}
