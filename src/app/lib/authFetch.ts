
export async function authFetch(url: string, options: RequestInit = {}) {

    const token = localStorage.getItem("accessToken");

    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
        },
    });

    if(res.status === 401 ) {
        const nowyToken = await odswiezToken();

        if (nowyToken){
            res = await fetch(url,{
                ...options,
                headers:{
                    ...options.headers,
                    "Authorization":`Bearer ${nowyToken}`,
                },
            });
        }
    }

    return res;
    
}

async function odswiezToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem("refreshToken");


    if(!refreshToken){
        return null;
    }

    try
    {
        const res = await fetch("http://localhost:5219/api/Auth/refresh",{
            method: "POST",
            headers: {"Content-Type":"application/json" },
            body: JSON.stringify({refreshToken}),
        });

        if (!res.ok){
            return null;
        }
        
   const data = await res.json();

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data.accessToken;
    } catch {
        return null;
    }
}