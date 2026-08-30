window.EgyFundAuthApi = {

    async requestPasswordReset(email) {
        if (window.EgyFundConfig.USE_MOCK_API) {
            return mockPasswordReset(email);
        }

        const response = await fetch(
            `${window.EgyFundConfig.API_BASE_URL}/auth/forgot-password`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message ||
                "Unable to process password reset request."
            );
        }

        return result;
    },




    async register(userData) {
        if (window.EgyFundConfig.USE_MOCK_API) {
            return mockRegister(userData);
        }

        const response = await fetch(
            `${window.EgyFundConfig.API_BASE_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Registration failed."
            );
        }

        return result;
    },

    async activateAccount(email, code) {
        if (window.EgyFundConfig.USE_MOCK_API) {
            return mockActivate(email, code);
        }

        const response = await fetch(
            `${window.EgyFundConfig.API_BASE_URL}/auth/activate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    code
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Activation failed."
            );
        }

        return result;
    },

    async resendActivationCode(email) {
        if (window.EgyFundConfig.USE_MOCK_API) {
            return mockResendActivationCode(email);
        }

        const response = await fetch(
            `${window.EgyFundConfig.API_BASE_URL}/auth/resend-activation`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Could not resend activation code."
            );
        }

        return result;
    }
};


function generateCode() {
    return String(
        Math.floor(100000 + Math.random() * 900000)
    );
}


function mockRegister(userData) {
    const activationCode = generateCode();

    const pendingRegistration = {
        userId: crypto.randomUUID(),
        email: userData.email,
        activationCode,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
    };

    window.EgyFundStorage.setPendingRegistration(
        pendingRegistration
    );

    /*
     * للتجربة فقط أثناء تطوير Front-end.
     * في التطبيق الحقيقي سيرسل Backend الكود بالبريد.
     */
    console.info(
        `[MOCK] Activation code for ${userData.email}: ${activationCode}`
    );

    return Promise.resolve({
        success: true,
        message: "Registration completed.",
        email: userData.email
    });
}


function mockActivate(email, code) {
    const pendingRegistration =
        window.EgyFundStorage.getPendingRegistration();

    if (!pendingRegistration) {
        return Promise.reject(
            new Error("No pending registration found.")
        );
    }

    if (pendingRegistration.email !== email) {
        return Promise.reject(
            new Error("Email does not match the pending registration.")
        );
    }

    if (Date.now() > pendingRegistration.expiresAt) {
        return Promise.reject(
            new Error("The activation code has expired.")
        );
    }

    if (code !== pendingRegistration.activationCode) {
        return Promise.reject(
            new Error("Invalid activation code.")
        );
    }

    const user = {
        id: pendingRegistration.userId,
        email: pendingRegistration.email,
        isActivated: true
    };

    window.EgyFundStorage.setCurrentUser(user);
    window.EgyFundStorage.removePendingRegistration();

    return Promise.resolve({
        success: true,
        user
    });
}


function mockResendActivationCode(email) {
    const pendingRegistration =
        window.EgyFundStorage.getPendingRegistration();

    if (!pendingRegistration || pendingRegistration.email !== email) {
        return Promise.reject(
            new Error("No pending registration found.")
        );
    }

    const activationCode = generateCode();

    pendingRegistration.activationCode = activationCode;
    pendingRegistration.expiresAt =
        Date.now() + 24 * 60 * 60 * 1000;

    window.EgyFundStorage.setPendingRegistration(
        pendingRegistration
    );

    console.info(
        `[MOCK] New activation code for ${email}: ${activationCode}`
    );

    return Promise.resolve({
        success: true,
        message: "A new activation code was sent."
    });
}

// ...existing code...

function mockPasswordReset(email) {
    const token = crypto.randomUUID();

    sessionStorage.setItem(
        "egyfund_password_reset",
        JSON.stringify({
            email,
            token,
            expiresAt: Date.now() + 15 * 60 * 1000
        })
    );

    /*
     * أثناء التطوير فقط.
     * في التطبيق الحقيقي سيرسل Backend الرابط عبر البريد.
     */
    console.info(
        `[MOCK] Password reset link: ` +
        `reset-password.html?token=${token}`
    );

    return Promise.resolve({
        success: true,
        message:
            "If an account exists for this email, " +
            "a password reset link has been sent."
    });
}