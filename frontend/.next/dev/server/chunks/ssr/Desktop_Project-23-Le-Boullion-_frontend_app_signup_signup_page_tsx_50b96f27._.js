module.exports = [
"[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>SignUpPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project-23-Le-Boullion-/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project-23-Le-Boullion-/frontend/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project-23-Le-Boullion-/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Project-23-Le-Boullion-/frontend/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function SignUpPage() {
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        firstName: "",
        lastName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        streetAddress: "",
        city: "",
        dateOfBirth: "",
        phoneNumber: ""
    });
    const [isOver21, setIsOver21] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [receiveNotifications, setReceiveNotifications] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [agreedToTerms, setAgreedToTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const update = (field, value)=>{
        setForm((prev)=>({
                ...prev,
                [field]: value
            }));
        setErrors((prev)=>({
                ...prev,
                [field]: ""
            }));
    };
    const validatePassword = (pw)=>{
        if (!pw) return "Password is required.";
        if (pw.length < 10) return "Password must be at least 10 characters.";
        if (!/[A-Z]/.test(pw)) return "Password must include at least one uppercase letter.";
        if (!/[0-9]/.test(pw)) return "Password must include at least one number.";
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) return "Password must include at least one special character (e.g. ! @ # $ %).";
        return null;
    };
    const validate = ()=>{
        const newErrors = {};
        if (!form.firstName) newErrors.firstName = "First name is required.";
        if (!form.lastName) newErrors.lastName = "Last name is required.";
        if (!form.email) newErrors.email = "Email address is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email address.";
        if (!form.confirmEmail) newErrors.confirmEmail = "Please confirm your email.";
        else if (form.email !== form.confirmEmail) newErrors.confirmEmail = "Email addresses do not match.";
        const passwordError = validatePassword(form.password);
        if (passwordError) newErrors.password = passwordError;
        if (!form.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
        else if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!form.streetAddress) newErrors.streetAddress = "Street address is required.";
        if (!form.city) newErrors.city = "City is required.";
        if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required.";
        if (isOver21 !== "yes") newErrors.isOver21 = "⚠️ You must confirm you are 21 or older to create an account.";
        if (!agreedToTerms) newErrors.terms = "⚠️ You must agree to the Terms and Conditions to continue.";
        return newErrors;
    };
    const handleSubmit = async ()=>{
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    isOver21: isOver21 === "yes",
                    receiveNotifications: receiveNotifications === "yes"
                })
            });
            if (!res.ok) {
                const data = await res.json();
                setErrors({
                    general: data.message || "Sign up failed. Please try again."
                });
            } else {
                window.location.href = "/login";
            }
        } catch  {
            setErrors({
                general: "Unable to connect. Please try again."
            });
        } finally{
            setLoading(false);
        }
    };
    const Field = ({ id, label, type = "text", placeholder })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "field-wrap",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    id: id,
                    type: type,
                    className: `field-input ${errors[id] ? "field-error" : ""}`,
                    placeholder: placeholder || label,
                    value: form[id],
                    onChange: (e)=>update(id, e.target.value)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                    lineNumber: 105,
                    columnNumber: 7
                }, this),
                errors[id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "error-inline",
                    children: errors[id]
                }, void 0, false, {
                    fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                    lineNumber: 113,
                    columnNumber: 22
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
            lineNumber: 104,
            columnNumber: 5
        }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "jsx-806556eb20849b14" + " " + "signup-root",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-806556eb20849b14" + " " + "signup-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-806556eb20849b14" + " " + "card-accent"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "jsx-806556eb20849b14" + " " + "card-inner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "brand-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-806556eb20849b14" + " " + "wine-icon",
                                        children: "🍷"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 124,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "jsx-806556eb20849b14" + " " + "brand-name",
                                        children: "Howard Street Wine Merchant"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "jsx-806556eb20849b14" + " " + "page-title",
                                children: "Sign-Up"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            errors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-806556eb20849b14" + " " + "error-msg",
                                children: errors.general
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 130,
                                columnNumber: 30
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "firstName",
                                label: "First Name",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "lastName",
                                label: "Last Name",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 133,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "email",
                                label: "Email Address",
                                type: "email",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "confirmEmail",
                                label: "Confirm Email Address",
                                type: "email",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "password",
                                label: "Password",
                                type: "password",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "password-hint",
                                children: "Password must be at least 10 characters and include an uppercase letter, a number, and a special character (e.g. ! @ # $)."
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "confirmPassword",
                                label: "Confirm Password",
                                type: "password",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 140,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "streetAddress",
                                label: "Street Address",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "city",
                                label: "City",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "dateOfBirth",
                                label: "date of birth",
                                type: "date",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "check-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-806556eb20849b14" + " " + "check-question",
                                        children: "Do you confirm you are 21 years of age or older?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 147,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-806556eb20849b14" + " " + "check-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isOver21 === "yes",
                                                onChange: ()=>setIsOver21(isOver21 === "yes" ? null : "yes"),
                                                className: "jsx-806556eb20849b14" + " " + "checkbox"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 151,
                                                columnNumber: 15
                                            }, this),
                                            "Yes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-806556eb20849b14" + " " + "check-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: isOver21 === "no",
                                                onChange: ()=>setIsOver21(isOver21 === "no" ? null : "no"),
                                                className: "jsx-806556eb20849b14" + " " + "checkbox"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 160,
                                                columnNumber: 15
                                            }, this),
                                            "No"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            errors.isOver21 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "jsx-806556eb20849b14" + " " + "error-inline",
                                children: errors.isOver21
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 169,
                                columnNumber: 31
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                id: "phoneNumber",
                                label: "Phone Number",
                                type: "tel",
                                className: "jsx-806556eb20849b14"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "check-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-806556eb20849b14" + " " + "check-question",
                                        children: "Would you like to receive email notifications and text messages about promotions?"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 175,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-806556eb20849b14" + " " + "check-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: receiveNotifications === "yes",
                                                onChange: ()=>setReceiveNotifications(receiveNotifications === "yes" ? null : "yes"),
                                                className: "jsx-806556eb20849b14" + " " + "checkbox"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 179,
                                                columnNumber: 15
                                            }, this),
                                            "Yes"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-806556eb20849b14" + " " + "check-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: receiveNotifications === "no",
                                                onChange: ()=>setReceiveNotifications(receiveNotifications === "no" ? null : "no"),
                                                className: "jsx-806556eb20849b14" + " " + "checkbox"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, this),
                                            "No"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "terms-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "jsx-806556eb20849b14" + " " + "terms-label",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                checked: agreedToTerms,
                                                onChange: (e)=>setAgreedToTerms(e.target.checked),
                                                className: "jsx-806556eb20849b14" + " " + "checkbox"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#c0392b",
                                                    fontSize: "1rem",
                                                    flexShrink: 0,
                                                    marginTop: "-2px",
                                                    alignSelf: "center"
                                                },
                                                className: "jsx-806556eb20849b14",
                                                children: "●"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 211,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-806556eb20849b14",
                                                children: [
                                                    "I have read and agree to the Wine Website",
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/terms",
                                                        className: "terms-link",
                                                        children: "Terms and Conditions"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    errors.terms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "jsx-806556eb20849b14" + " " + "error-inline",
                                        children: errors.terms
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-806556eb20849b14" + " " + "btn-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSubmit,
                                        disabled: loading,
                                        className: "jsx-806556eb20849b14" + " " + "continue-btn",
                                        children: loading ? "Creating Account..." : "Continue"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "cancel-btn",
                                        children: "Cancel"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                        lineNumber: 227,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Project$2d$23$2d$Le$2d$Boullion$2d2f$frontend$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                id: "806556eb20849b14",
                children: '@import "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400;700&display=swap";.signup-root.jsx-806556eb20849b14{background:#f7f4f0 radial-gradient(at 100% 0,#f0e8e0 0%,#0000 50%);justify-content:center;align-items:flex-start;min-height:100vh;padding:2rem 1rem;font-family:Lato,sans-serif;display:flex}.signup-card.jsx-806556eb20849b14{background:#fff;border-radius:4px;width:100%;max-width:560px;margin:1rem 0;overflow:hidden;box-shadow:0 8px 30px #0000001a}.card-accent.jsx-806556eb20849b14{background:linear-gradient(90deg,#8b1a1a,#c0392b,#8b1a1a);height:5px}.card-inner.jsx-806556eb20849b14{padding:2rem 2.5rem 2.5rem}.brand-header.jsx-806556eb20849b14{justify-content:center;align-items:center;gap:.5rem;margin-bottom:.75rem;display:flex}.wine-icon.jsx-806556eb20849b14{font-size:1.2rem}.brand-name.jsx-806556eb20849b14{color:#8b1a1a;letter-spacing:.08em;text-transform:uppercase;margin:0;font-family:Playfair Display,serif;font-size:.8rem;font-weight:700}.page-title.jsx-806556eb20849b14{color:#1a1a1a;text-align:center;margin:0 0 1.5rem;font-family:Playfair Display,serif;font-size:1.6rem;font-weight:700}.error-msg.jsx-806556eb20849b14{color:#c0392b;background:#fff0f0;border-left:3px solid #c0392b;border-radius:2px;margin-bottom:1rem;padding:.6rem .9rem;font-size:.85rem}.field-wrap.jsx-806556eb20849b14{margin-bottom:.7rem}.field-input.jsx-806556eb20849b14{color:#222;box-sizing:border-box;background:#fff;border:1px solid #bbb;border-radius:3px;outline:none;width:100%;height:38px;padding:0 .75rem;font-family:Lato,sans-serif;font-size:.9rem;transition:border-color .2s;display:block}.field-input.jsx-806556eb20849b14:focus{border-color:#8b1a1a}.field-input.field-error.jsx-806556eb20849b14{background:#fff8f8;border-color:#c0392b}.password-hint.jsx-806556eb20849b14{color:#777;background:#f9f9f9;border-left:3px solid #c0392b;margin:-.3rem 0 .7rem;padding:.4rem .6rem;font-size:.75rem;line-height:1.4}.error-inline.jsx-806556eb20849b14{color:#c0392b;margin-top:.2rem;padding-left:.25rem;font-size:.75rem;display:block}.check-row.jsx-806556eb20849b14{flex-wrap:wrap;align-items:center;gap:.6rem;margin:.9rem 0 .4rem;display:flex}.check-question.jsx-806556eb20849b14{color:#333;flex:100%;font-size:.88rem;line-height:1.4}.check-label.jsx-806556eb20849b14{color:#333;cursor:pointer;align-items:center;gap:.3rem;font-size:.9rem;display:flex}.checkbox.jsx-806556eb20849b14{accent-color:#8b1a1a;cursor:pointer;width:16px;height:16px}.terms-row.jsx-806556eb20849b14{margin:1rem 0 1.5rem}.terms-label.jsx-806556eb20849b14{color:#333;cursor:pointer;align-items:flex-start;gap:.6rem;font-size:.88rem;line-height:1.5;display:flex}.terms-label.jsx-806556eb20849b14 .checkbox.jsx-806556eb20849b14{flex-shrink:0;margin-top:2px}.terms-link.jsx-806556eb20849b14{color:#1a1a8b;font-weight:700;text-decoration:underline}.terms-link.jsx-806556eb20849b14:hover{color:#0d0d6e}.btn-row.jsx-806556eb20849b14{justify-content:center;align-items:center;gap:1rem;display:flex}.continue-btn.jsx-806556eb20849b14{color:#fff;cursor:pointer;background:#2980d9;border:none;border-radius:50px;padding:.7rem 2.2rem;font-family:Lato,sans-serif;font-size:1rem;font-weight:700;transition:background .2s,transform .1s}.continue-btn.jsx-806556eb20849b14:hover:not(:disabled){background:#1f6ab5;transform:translateY(-1px)}.continue-btn.jsx-806556eb20849b14:disabled{opacity:.6;cursor:not-allowed}.cancel-btn.jsx-806556eb20849b14{color:#222;background:#e09c1a;border-radius:50px;padding:.7rem 2.2rem;font-size:1rem;font-weight:700;text-decoration:none;transition:background .2s,transform .1s;display:inline-block}.cancel-btn.jsx-806556eb20849b14:hover{background:#c8861a;transform:translateY(-1px)}'
            }, void 0, false, void 0, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Project-23-Le-Boullion-/frontend/app/signup/signup_page.tsx",
        lineNumber: 118,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_Project-23-Le-Boullion-_frontend_app_signup_signup_page_tsx_50b96f27._.js.map