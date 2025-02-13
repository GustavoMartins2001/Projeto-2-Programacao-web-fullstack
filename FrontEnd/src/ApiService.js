exports.loginUser = async (email, password) => {
    try {
        const response = await fetch(`http://localhost:4200/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao logar:', error);
    }
};

exports.LikeImage = async (imageCode) => {
    try {
        const response = await fetch(`http://localhost:4200/api/img?imageCode=${encodeURIComponent(imageCode)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao dar like');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao dar like:', error);
    }
};

exports.getTop5Images = async () => {
    try {
        const response = await fetch('http://localhost:4200/api/img/top-5', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar top 5');
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar top 5:', error);
    }
};

