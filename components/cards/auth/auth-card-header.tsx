export default function AuthCardHeader({ stage, isLogin, setIsLogin }: { stage: "initial" | "verification", isLogin: boolean; setIsLogin: Function }) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">
                {stage === "initial" ? (isLogin ? "Войдите в аккаунт" : "Создайте аккаунт") : "Подтверждение"}
            </h2>
            {stage === "initial" && (
                <p className="mt-1 text-sm text-muted-foreground">
                    {isLogin ? "Или " : "Уже есть аккаунт? "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="font-medium text-primary hover:underline focus:outline-none"
                    >
                        {isLogin ? "создайте новый аккаунт" : "войдите"}
                    </button>
                </p>
            )}
            {stage === "verification" && (
                <p className="mt-1 text-sm text-muted-foreground">
                    На вашу почту отправлен код подтверждения
                </p>
            )}
        </div>
    );
}