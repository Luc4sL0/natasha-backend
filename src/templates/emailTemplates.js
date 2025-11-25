export const getContactHtml = (nome, email, mensagem) => {
    return `
        <div style="font-family: Arial;">
            <h2>Novo contato de ${nome}</h2>
            <p>Email: ${email}</p>
            <hr>
            <p>${mensagem}</p>
        </div>
    `;
};

export const getContactText = (nome, email, mensagem) => {
    return `NOVO CONTATO\nNome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`;
};