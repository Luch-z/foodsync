import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div>
            <div className="text-center pt-3">
                <h1 className="text-3xl">FoodSynch</h1>
                <Link href={"/login"}>
                    <Button className="mt-3">Login</Button>
                </Link>
            </div>
        </div>
    );
}
