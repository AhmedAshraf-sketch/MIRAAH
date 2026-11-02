import { useParams } from "react-router-dom";
import Main from "../components/main";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CategoryPage() {
    const { category } = useParams();

    return (
        <>
            <Header />
            <Main key={category} initialCategory={category} />
            <Footer />
        </>
    );
}

export default CategoryPage;