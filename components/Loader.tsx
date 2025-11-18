"use client";
import { PuffLoader } from "react-spinners";

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <PuffLoader size={100} color="red" />
        </div>
    );
};

export default Loader;