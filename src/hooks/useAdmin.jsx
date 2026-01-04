import { useEffect, useState, use } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAdmin = () => {
    const { user, loading } = use(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
      
        if (!loading && user?.email) {
            fetch(`https://personal-project-k.vercel.app/users/admin/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setIsAdmin(data?.admin || false);
                    setIsAdminLoading(false); 
                })
                .catch(err => {
                    console.error("Admin fetch error:", err);
                    setIsAdmin(false);
                    setIsAdminLoading(false); 
                });
        } 
        
        else if (!loading && !user) {
            setIsAdmin(false);
            setIsAdminLoading(false);
        }
    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default useAdmin;