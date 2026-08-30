window.EgyFundStorage = {
    setPendingRegistration(data) {
        sessionStorage.setItem(
            "egyfund_pending_registration",
            JSON.stringify(data)
        );
    },

    getPendingRegistration() {
        const data = sessionStorage.getItem(
            "egyfund_pending_registration"
        );

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    },

    removePendingRegistration() {
        sessionStorage.removeItem(
            "egyfund_pending_registration"
        );
    },

    setCurrentUser(user) {
        sessionStorage.setItem(
            "egyfund_current_user",
            JSON.stringify(user)
        );
    },

    getCurrentUser() {
        const data = sessionStorage.getItem(
            "egyfund_current_user"
        );

        if (!data) {
            return null;
        }

        try {
            return JSON.parse(data);
        } catch {
            return null;
        }
    }
};