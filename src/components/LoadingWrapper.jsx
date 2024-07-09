import { Loader } from "@mantine/core";

export default function LoadingWrapper({ children, isLoading = true }) {
    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <Loader size="xs" />
            </div>
        );
    } else {
        return <>{children}</>;
    }
}
