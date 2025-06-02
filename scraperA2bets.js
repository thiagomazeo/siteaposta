import puppeteer from "puppeteer";
import fs from "fs/promises";

async function run() {
  const browser = await puppeteer.launch({ headless: false }); // mostrar navegador
  const page = await browser.newPage();

  try {
    console.log("🔐 Acessando página de login...");
    await page.goto("https://a2bets-com.jogos.app/sistema_v2/login.aspx", { waitUntil: "networkidle2" });

    // Esperar input de login (campo tipo texto/email)
    await page.waitForSelector('input[type="text"], input[type="email"]', { timeout: 30000 });

    // Digitar usuário e senha
    await page.type('input[type="text"], input[type="email"]', "lourival", { delay: 100 });
    await page.type('input[type="password"]', "204060", { delay: 100 });

    // Clicar no botão de login e esperar navegação
    await Promise.all([
      page.click('input[type="submit"], button[type="submit"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    console.log("✔ Login realizado. Navegando para página de jogos...");

    // Navegar para página de jogos
    await page.goto("https://a2bets-com.jogos.app/sistema_v2/usuarios/colaborador/desktop/jogos.aspx?idesporte=102&idcampeonato=574588", { waitUntil: "networkidle2" });

    // Aqui você ajusta o seletor para capturar os dados reais da página
    const jogos = await page.evaluate(() => {
      // Exemplo de seleção dos jogos - ajuste conforme HTML real da página
      const elementosJogos = document.querySelectorAll(".jogo-item"); // exemplo
      const dados = [];
      elementosJogos.forEach(el => {
        dados.push({
          timeA: el.querySelector(".timeA")?.textContent.trim() || null,
          timeB: el.querySelector(".timeB")?.textContent.trim() || null,
          horario: el.querySelector(".horario")?.textContent.trim() || null,
          // Adicione outros campos que quiser extrair
        });
      });
      return dados;
    });

    // Salvar no arquivo JSON
    await fs.writeFile("jogos.json", JSON.stringify(jogos, null, 2), "utf-8");

    console.log("✅ Dados salvos no arquivo jogos.json");

  } catch (error) {
    console.error("❌ Erro ao processar:", error);
  } finally {
    // await browser.close(); // Descomente para fechar navegador automaticamente
  }
}

run();
