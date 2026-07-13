// auth.js

// Hash SHA-256 gerado para o utilizador "carlosmartins@academicos.pt"
const USER_HASH = "8ba788939bd6575de2db7e5e347fb7fa75979c78759fb1c5bf0f49646b53cc97";

// Hash SHA-256 gerado para a senha "academicos2027"
const PASS_HASH = "85b244018260b00dfbf6c7a33cf50676fae85295f7ba1420716616e256f3458c";

// Função auxiliar para encriptar os dados que o diretor digita
async function gerarHash(string) {
    const msgBuffer = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Função que o index.html vai chamar para validar o login localmente
export async function validarCredenciais(usuarioDigitado, senhaDigitada) {
    const hashUser = await gerarHash(usuarioDigitado.trim().toLowerCase());
    const hashPass = await gerarHash(senhaDigitada);

    return (hashUser === USER_HASH && hashPass === PASS_HASH);
}
