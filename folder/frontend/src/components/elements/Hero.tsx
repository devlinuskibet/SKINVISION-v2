import { SignedIn, SignedOut, SignIn, SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

export interface IHeroSection {
    title: string,
    description: string,
    imagePath: string,
    primaryAction: {
        text: string,
        href: string
    }, secondaryAction: {
        text: string,
        href: string
    },
}

function Hero({ title, description, imagePath, primaryAction, secondaryAction }: IHeroSection) {
    const {user } = useUser();
    return (
        <>
            <section className="py-6 my-14 mb-1 bg-primary-50">
                <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-5xl font-bold text-primary-500 mb-4">
                        {title}
                    </h1>
                    <p className="text-lg text-charcoalGrey mb-6">
                        {description}
                    </p>
                    <div className="flex space-x-4">
                            {primaryAction && 
                                !user ? <SignedOut>
                                    <SignInButton>
                                        <Button variant={"default"} className="p-4">
                                            Analyze Your Skin Condition
                                        </Button>
                                    </SignInButton>
                                </SignedOut> 
                     : (<Link to="/dashboard/$userId" params={{ userId: user?.firstName! }}>
                                <Button variant={"default"}>
                                    Analyze Your Skin Condition
                                </Button>
                            </Link>)}

                        {secondaryAction && (
                           <SignedOut>
                            <SignUpButton>
                                <Button variant={"outline"} className="p-4">
                                    Join us
                                </Button>
                            </SignUpButton>
                           </SignedOut> 
                        )}
                    </div>
                </div>
                <div className="flex-1 mb-8 lg:mb-0">
                    <img 
                        src={imagePath} 
                        alt="ShambaFusion marketplace" 
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
                </div>
            </section>
        </>
    );
}

export default Hero;