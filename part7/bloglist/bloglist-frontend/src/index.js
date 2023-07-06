import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"

import { NotificationContexProvider } from "./components/NotificationContext.js"
import { UserContextProvider } from "./components/UserContext.js"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationContexProvider>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                </Router>
            </QueryClientProvider>
        </UserContextProvider>
    </NotificationContexProvider>
)