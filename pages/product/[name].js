import { useRouter } from "next/router";
export default function Name(){
    const router = useRouter();
    const {name} = router.query;
    //const name = router.query.name;
    console.log(router.query);
    return <h1>{name}のページです</h1>;
}