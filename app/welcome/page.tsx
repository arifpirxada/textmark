import Footer from "@/components/common/Footer"
import Header from "@/components/common/Header"
import DemoVideo from "@/components/home/DemoVideo"
import TextMarkHero from "@/components/home/TextMarkHero"

const WelcomePage = () => {
    return (
        <main className="mark-gradient pt-4">
            <Header />
            <TextMarkHero />
            <DemoVideo />
            <Footer />
        </main>
    )
}

export default WelcomePage