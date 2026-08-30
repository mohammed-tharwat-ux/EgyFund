document.addEventListener("DOMContentLoaded", () => {
    const authEntryButton = document.querySelector(
        "[data-auth-entry]"
    );

    const modal = document.querySelector("#login-modal");
    const loginForm = document.querySelector("#login-form");

    /*
     * وظيفة زر الهيدر المستقلّة
     * يجب أن تعمل حتى لو كان هناك خطأ في محتوى الـ Modal
     */
    if (authEntryButton) {
        const registrationStarted =
            sessionStorage.getItem(
                "egyfund_registration_started"
            ) === "true";

        authEntryButton.textContent =
            registrationStarted ? "Log in" : "Sign up";

        authEntryButton.addEventListener("click", () => {
            const hasStartedRegistration =
                sessionStorage.getItem(
                    "egyfund_registration_started"
                ) === "true";

            if (!hasStartedRegistration) {
                sessionStorage.setItem(
                    "egyfund_registration_started",
                    "true"
                );

                window.location.href =
                    "pages/auth/register.html";

                return;
            }

            if (modal) {
                openLoginModal();
            } else {
                console.error(
                    "Login modal was not found in index.html"
                );
            }
        });
    }

    /*
     * لو الـ Modal غير موجود، لا نوقف زر Sign up.
     * نوقف فقط الجزء الخاص بتسجيل الدخول.
     */
    if (!modal || !loginForm) {
        console.error(
            "Missing #login-modal or #login-form in index.html"
        );

        return;
    }

    function openLoginModal() {
        modal.hidden = false;

        document.body.classList.add(
            "login-modal-open"
        );

        const emailInput =
            document.querySelector("#login-email");

        if (emailInput) {
            emailInput.focus();
        }
    }

    function closeLoginModal() {
        modal.hidden = true;

        document.body.classList.remove(
            "login-modal-open"
        );
    }

    const closeButtons = document.querySelectorAll(
        "[data-close-login]"
    );

    const openButtons = document.querySelectorAll(
        "[data-open-login]"
    );

    closeButtons.forEach((button) => {
        button.addEventListener(
            "click",
            closeLoginModal
        );
    });

    openButtons.forEach((button) => {
        button.addEventListener(
            "click",
            openLoginModal
        );
    });

    /*
     * فتح Login تلقائيًا بعد تفعيل الحساب
     */
    const shouldOpenLogin =
        new URLSearchParams(
            window.location.search
        ).get("login") === "1";

    if (shouldOpenLogin) {
        openLoginModal();

        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        );
    }

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !modal.hidden
        ) {
            closeLoginModal();
        }
    });

    /*
     * اتركي هنا كود submit الخاص بتسجيل الدخول الموجود عندك
     */
});

/*
 * فتح نافذة تسجيل الدخول
 */
function openLoginModal() {
    modal.hidden = false;

    document.body.classList.add(
        "login-modal-open"
    );

    const emailInput = document.querySelector(
        "#login-email"
    );

    if (emailInput) {
        emailInput.focus();
    }
}

/*
 * إغلاق نافذة تسجيل الدخول
 */
function closeLoginModal() {
    modal.hidden = true;

    document.body.classList.remove(
        "login-modal-open"
    );
}

/*
 * تحديد وظيفة الزر الواحد:
 *
 * أول مرة:
 * Sign up → يذهب إلى register.html
 *
 * بعد بدء التسجيل:
 * Log in → يفتح Login Modal
 */
function updateAuthEntryButton() {
    if (!authEntryButton) {
        return;
    }

    const registrationStarted =
        sessionStorage.getItem(
            "egyfund_registration_started"
        ) === "true";

    if (registrationStarted) {
        authEntryButton.textContent = "Log in";
    } else {
        authEntryButton.textContent = "Sign up";
    }
}

updateAuthEntryButton();

/*
 * التعامل مع الزر الواحد
 */
if (authEntryButton) {
    authEntryButton.addEventListener("click", () => {
        const registrationStarted =
            sessionStorage.getItem(
                "egyfund_registration_started"
            ) === "true";

        if (!registrationStarted) {
            /*
             * أول ضغطة:
             * تسجيل حالة أن المستخدم بدأ التسجيل
             */
            sessionStorage.setItem(
                "egyfund_registration_started",
                "true"
            );

            window.location.href =
                "pages/auth/register.html";

            return;
        }

        /*
         * الضغطة التالية:
         * فتح Login Modal فوق الصفحة الرئيسية
         */
        openLoginModal();
    });
}

/*
 * دعم أي أزرار أخرى تحمل data-open-login
 */
openButtons.forEach((button) => {
    button.addEventListener(
        "click",
        openLoginModal
    );
});

/*
 * إغلاق النافذة من زر X أو الخلفية
 */
closeButtons.forEach((button) => {
    button.addEventListener(
        "click",
        closeLoginModal
    );
});

/*
 * إغلاق النافذة بزر Escape
 */
document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        !modal.hidden
    ) {
        closeLoginModal();
    }
});

/*
 * بعد تفعيل الحساب:
 * activate.js يرجع إلى:
 *
 * index.html?login=1
 *
 * فيتم فتح Login Modal تلقائيًا
 */
const shouldOpenLogin =
    new URLSearchParams(
        window.location.search
    ).get("login") === "1";

if (shouldOpenLogin) {
    openLoginModal();

    /*
     * إزالة ?login=1 من الرابط
     * حتى لا تفتح النافذة مرة أخرى عند Refresh
     */
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}

/*
 * إرسال بيانات Login
 */
loginForm.addEventListener(
    "submit",
    async (event) => {
        event.preventDefault();

        const email = document.querySelector(
            "#login-email"
        );

        const password = document.querySelector(
            "#login-password"
        );

        const submitButton =
            loginForm.querySelector(
                ".login-submit"
            );

        clearErrors();

        let isValid = true;

        if (
            !email.value.trim() ||
            !email.validity.valid
        ) {
            setError(
                email,
                "Enter a valid email address."
            );

            isValid = false;
        }

        if (!password.value) {
            setError(
                password,
                "Enter your password."
            );

            isValid = false;
        }

        if (!isValid) {
            showMessage(
                "Please correct the highlighted fields.",
                "error"
            );

            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Logging in...";

        try {
            const result =
                await window.EgyFundAuthApi.login({
                    email: email.value
                        .trim()
                        .toLowerCase(),

                    password: password.value
                });

            /*
             * إذا كان الحساب غير مفعّل،
             * نرسل المستخدم إلى صفحة التفعيل
             */
            if (result.requiresActivation) {
                sessionStorage.setItem(
                    "egyfund_activation_email",
                    email.value
                        .trim()
                        .toLowerCase()
                );

                window.location.href =
                    "pages/auth/activate.html";

                return;
            }

            /*
             * حفظ بيانات المستخدم بعد Login
             */
            window.EgyFundStorage.setCurrentUser(
                result.user
            );

            showMessage(
                "Login successful.",
                "success"
            );

            window.setTimeout(() => {
                closeLoginModal();
                window.location.reload();
            }, 700);
        } catch (error) {
            showMessage(
                error.message ||
                "Login failed.",
                "error"
            );

            submitButton.disabled = false;
            submitButton.textContent = "Login";
        }
    }
);

/*
 * أزرار Google و X و Facebook
 */
document
    .querySelectorAll("[data-provider]")
    .forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const provider =
                    button.dataset.provider;

                /*
                 * هذا المكان سيتم ربطه بالـ Backend
                 * عند تجهيز OAuth الحقيقي.
                 */
                if (
                    window.EgyFundAuthApi &&
                    typeof window.EgyFundAuthApi
                        .startSocialLogin ===
                    "function"
                ) {
                    window.EgyFundAuthApi
                        .startSocialLogin(provider);

                    return;
                }

                showMessage(
                    `Continue with ${provider} is not connected yet.`,
                    "error"
                );
            }
        );
    });

function setError(field, text) {
    const errorElement =
        document.querySelector(
            `[data-error-for="${field.id}"]`
        );

    field.classList.toggle(
        "input-error",
        Boolean(text)
    );

    if (errorElement) {
        errorElement.textContent = text;
    }
}

function clearErrors() {
    document
        .querySelectorAll(".login-error")
        .forEach((element) => {
            element.textContent = "";
        });

    document
        .querySelectorAll("#login-form input")
        .forEach((input) => {
            input.classList.remove(
                "input-error"
            );
        });

    message.textContent = "";
    message.className = "login-message";
}

function showMessage(text, type) {
    message.textContent = text;
    message.className =
        `login-message ${type}`;
}
