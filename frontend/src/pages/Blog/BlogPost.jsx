import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSEO from '../../hooks/useSEO';
import { ARTIGO_POR_ID } from '../../data/artigos';
import './Blog.css';

// Só o CORPO de cada artigo. Título, categoria, imagem e resumo vivem em
// data/artigos.js, que o índice também lê — manter duas listas foi o que
// quebrou os 5 links do blog até 17/09/2026. A chave aqui é o mesmo id de lá.
const CONTEUDOS = {
  'cftv-analogico-vs-ip-custo-real': (
    <>
      <p>
        A proposta de manter o sistema analógico quase sempre ganha na primeira comparação: a
        câmera custa menos, o cabo coaxial já está passado e o gravador continua funcionando.
        A conta só muda quando alguém precisa <em>usar</em> a imagem — e descobre que ela não
        serve para o que foi comprada.
      </p>

      <h2>O que &quot;resolução&quot; significa quando você precisa da gravação</h2>
      <p>
        O número de megapixels diz pouco sozinho. O que determina se uma imagem identifica uma
        pessoa é a densidade de pixels sobre o alvo, medida em pixels por metro (px/m). A norma
        IEC 62676-4 organiza isso na escala DORI, e as faixas são bem diferentes entre si:
      </p>
      <ul>
        <li><strong>Detectar</strong> (~25 px/m): você sabe que há alguém ali.</li>
        <li><strong>Observar</strong> (~63 px/m): dá para acompanhar o que a pessoa faz.</li>
        <li><strong>Reconhecer</strong> (~125 px/m): dá para dizer se é alguém que você já conhece.</li>
        <li><strong>Identificar</strong> (~250 px/m): serve para apontar quem é, sem conhecer antes.</li>
      </ul>
      <p>
        Uma câmera analógica típica entrega cerca de 0,4 MP. Espalhada sobre a largura de uma
        garagem ou de uma recepção, ela costuma ficar na faixa de detecção — registra que houve
        movimento, não quem estava ali. É por isso que tanta gravação &quot;funciona&quot; e ainda
        assim não resolve nada.
      </p>

      <h2>Os custos que não aparecem na proposta</h2>
      <p>
        O valor da câmera é o único item que as duas opções deixam explícito. O resto aparece
        depois, e costuma ser maior:
      </p>
      <ul>
        <li>
          <strong>Ocorrência não resolvida.</strong> Sem imagem que identifique, o boletim vira
          estatística. O prejuízo do furto fica inteiro com você.
        </li>
        <li>
          <strong>Sinistro questionado.</strong> Seguradoras pedem evidência do evento. Imagem
          sem nitidez enfraquece a comprovação e trava o processo.
        </li>
        <li>
          <strong>Retrabalho de infraestrutura.</strong> Trocar câmera por câmera hoje e refazer
          tudo em dois anos custa duas instalações, não uma.
        </li>
        <li>
          <strong>Tempo de gestão.</strong> Horas de síndico, RH ou segurança revisando gravação
          inútil são horas pagas do mesmo jeito.
        </li>
      </ul>

      <h2>Quando manter o analógico é a decisão certa</h2>
      <p>
        Nem sempre trocar tudo é o melhor caminho. Se o coaxial está em bom estado e o problema
        é só resolução, as tecnologias HD sobre coax (HDCVI, TVI, AHD) elevam bastante a imagem
        reaproveitando o cabeamento existente — um meio-termo legítimo, sem passar cabo novo.
      </p>
      <p>
        A migração para IP se justifica quando você precisa de recursos que o analógico não tem:
        análise de vídeo, integração com controle de acesso, acesso remoto estável, contagem de
        pessoas ou câmeras em pontos onde só há rede. Aí não é upgrade de imagem, é outra função.
      </p>

      <h2>Como decidir sem chutar</h2>
      <p>
        Antes de pedir orçamento, defina o que cada ponto precisa entregar. Para a portaria,
        provavelmente identificação. Para o corredor de garagem, talvez só detecção. Essa
        definição muda o projeto inteiro — e evita pagar 4K onde 2 MP resolveria.
      </p>
      <p>
        Se quiser essa análise ponto a ponto na sua operação, veja como estruturamos{' '}
        <Link to="/servicos/cftv">CFTV e monitoramento</Link> ou fale com a nossa equipe.
      </p>
    </>
  ),

  'quanto-custa-rede-escritorio-50-pessoas': (
    <>
      <p>
        &quot;Quanto custa a rede de um escritório de 50 pessoas?&quot; é uma pergunta sem resposta
        única — e desconfie de quem der um número antes de ver a planta. O que dá para fazer, e é
        mais útil, é mostrar quais decisões movem o preço e quais itens são caros sem motivo.
      </p>

      <h2>Comece pelos pontos, não pelas pessoas</h2>
      <p>
        O dimensionamento não sai de &quot;50 pessoas&quot;. Sai da contagem de pontos de rede, que
        costuma ficar entre 1,5 e 2 por posto de trabalho quando você soma o que realmente se
        conecta: estação, telefone IP, impressora de setor, access point, câmera, catraca, TV de
        sala de reunião, relógio de ponto. Um escritório de 50 postos raramente fica abaixo de 80
        pontos — e é essa contagem que define cabo, patch panel, switch e tamanho do rack.
      </p>

      <h2>Cabeamento: onde a economia errada dói mais</h2>
      <p>
        O cabo é o item mais barato do projeto e o mais caro de trocar, porque está dentro da
        parede e do forro. Trocar switch é uma tarde; repassar cabeamento é obra.
      </p>
      <ul>
        <li><strong>Cat5e</strong> entrega 1 Gbps e ainda atende muita coisa, mas é o piso.</li>
        <li><strong>Cat6</strong> é o equilíbrio para a maioria dos escritórios novos hoje.</li>
        <li><strong>Cat6A</strong> faz sentido com 10 Gbps no horizonte ou PoE de maior potência.</li>
      </ul>
      <p>
        O que separa uma rede estável de uma rede com &quot;lentidão que ninguém explica&quot; quase
        nunca é a categoria do cabo — é a execução: raio de curvatura respeitado, destrançamento
        mínimo na terminação, distância do cabeamento elétrico e certificação de cada ponto no
        final. Exija o relatório de certificação. É ele que prova que o que foi instalado atinge o
        que foi vendido.
      </p>

      <h2>Switches: gerenciável muda o que é possível</h2>
      <p>
        Switch não gerenciável é mais barato e funciona — até você precisar segregar a rede de
        visitantes, isolar o tráfego das câmeras, priorizar voz ou descobrir qual porta está
        gerando problema. Com PoE, o switch também alimenta APs, câmeras e telefones pelo próprio
        cabo, o que elimina tomada e fonte em cada ponto alto. Some a potência de tudo que será
        alimentado antes de escolher, e deixe folga.
      </p>

      <h2>Wi-Fi se calcula por área e obstáculo, não por pessoa</h2>
      <p>
        O erro clássico é comprar &quot;um roteador bom&quot; e esperar cobertura. Wi-Fi corporativo
        se projeta por planta: drywall, concreto, vidro e estruturas metálicas mudam tudo. Vários
        APs de potência moderada, com canais planejados, superam um equipamento potente no meio do
        andar — que só aumenta interferência. Para 50 pessoas num layout aberto, normalmente se
        fala em alguns APs distribuídos, não em um.
      </p>

      <h2>Rack e energia: o item esquecido</h2>
      <p>
        O rack precisa de espaço para crescer, organização de cabos, ventilação e — o mais
        negligenciado — energia estável. Nobreak dimensionado para o rack mantém switches, firewall
        e telefonia de pé numa queda. Sem isso, a rede inteira cai junto com a energia, mesmo com
        todo o resto bem feito.
      </p>

      <h2>O que costuma ser supérfluo</h2>
      <ul>
        <li>Cat6A em escritório que não tem, nem terá, 10 Gbps no desktop.</li>
        <li>Switch de camada 3 onde não há roteamento entre VLANs para fazer.</li>
        <li>APs Wi-Fi 7 com parque de notebooks que não suporta o padrão.</li>
        <li>Rack superdimensionado &quot;para o futuro&quot; enquanto falta nobreak no presente.</li>
      </ul>
      <p>
        O caminho honesto é levantamento em campo e projeto antes do orçamento. É assim que
        montamos <Link to="/servicos/redes-ti">redes e infraestrutura de TI</Link>.
      </p>
    </>
  ),

  'contrato-manutencao-eletrica-condominio': (
    <>
      <p>
        A maioria dos contratos de manutenção elétrica de condomínio cabe em uma página e cobra
        mensalidade por &quot;visita técnica&quot;. O problema aparece no dia da emergência, quando
        ninguém consegue apontar no papel o que exatamente foi contratado.
      </p>

      <h2>ART: o item que separa serviço técnico de mão de obra</h2>
      <p>
        A Anotação de Responsabilidade Técnica vincula um profissional registrado no CREA ao
        serviço executado. Sem ela, não há responsável técnico formal — e isso costuma aparecer
        no pior momento: perícia de sinistro, exigência de seguradora ou renovação do AVCB.
        Exija ART para projetos e intervenções relevantes, e guarde-as com a documentação do
        condomínio.
      </p>

      <h2>SLA: prazo por severidade, não prazo único</h2>
      <p>
        &quot;Atendimento em 24h&quot; não significa nada se o elevador parou ou se o quadro está
        superaquecendo. Um SLA útil separa níveis:
      </p>
      <ul>
        <li><strong>Emergência</strong> (risco à segurança, falta de energia em área comum): horas, com cobertura noturna e de fim de semana.</li>
        <li><strong>Urgente</strong> (falha que degrada a operação, sem risco imediato): mesmo dia útil ou o seguinte.</li>
        <li><strong>Programado</strong> (ajustes e melhorias): data combinada em agenda.</li>
      </ul>
      <p>
        Defina também o que acontece se o prazo não for cumprido. SLA sem consequência é intenção.
      </p>

      <h2>Laudo periódico e termografia</h2>
      <p>
        A manutenção que evita ocorrência é a preventiva, e ela precisa gerar registro. Um laudo
        periódico com fotos, medições e pendências classificadas por risco dá ao síndico algo que
        vale mais do que a visita: histórico. A inspeção termográfica dos quadros encontra conexão
        frouxa e ponto de aquecimento antes de virarem falha ou incêndio — e o comparativo entre
        laudos mostra o que está piorando com o tempo.
      </p>

      <h2>Quem contrata também responde</h2>
      <p>
        O condomínio é contratante e tem obrigações próprias de segurança do trabalho. Exigir
        comprovação de treinamento NR-10 da equipe, ordem de serviço e uso de EPI não é rigor
        excessivo: é o que protege o condomínio se algo acontecer dentro dele.
      </p>

      <h2>Checklist antes de assinar</h2>
      <ul>
        <li>Escopo com o que está incluído <em>e</em> o que é cobrado à parte.</li>
        <li>SLA por severidade, com cobertura de emergência 24h e consequência definida.</li>
        <li>Periodicidade do laudo técnico e da termografia dos quadros.</li>
        <li>Emissão de ART quando aplicável.</li>
        <li>Comprovação de NR-10 e EPI da equipe que entra no condomínio.</li>
        <li>Inventário inicial da instalação, com pendências herdadas registradas.</li>
        <li>Prazo, reajuste e regra de rescisão claros.</li>
      </ul>
      <p>
        Quer comparar com o que você tem hoje? Veja como estruturamos{' '}
        <Link to="/servicos/eletrica">projetos e manutenção elétrica</Link>.
      </p>
    </>
  ),

  'automacao-predial-quando-investimento-se-paga': (
    <>
      <p>
        Automação predial é vendida com promessa de economia e comprada com desconfiança — quase
        sempre com razão, porque o retorno depende de onde ela é aplicada. A mesma tecnologia que
        se paga em dois anos numa garagem pode não se pagar nunca numa sala de reunião.
      </p>

      <h2>Onde a economia realmente aparece</h2>
      <p>
        O retorno vem de carga que fica ligada sem necessidade. Em condomínios e escritórios,
        isso se concentra em poucos lugares: garagens, corredores, escadas, halls, banheiros e
        áreas de uso intermitente. São ambientes que ficam iluminados o dia inteiro para serem
        usados minutos por hora.
      </p>
      <p>
        Sensores de presença, dimerização e automação de cargas nesses pontos reduzem o consumo
        das áreas comuns em cerca de 20% a 35%, com payback típico entre 18 e 36 meses. A faixa é
        larga de propósito: depende da tarifa, das horas de operação e de quão ineficiente era o
        cenário anterior.
      </p>

      <h2>O que não se paga sozinho</h2>
      <p>
        Cenas de iluminação em sala de reunião, cortina motorizada, áudio distribuído e integração
        por voz são conforto, e conforto é uma decisão legítima — mas não sustentada por economia
        de energia. Misturar as duas coisas na mesma justificativa é o que faz um projeto de
        automação &quot;não entregar o que prometeu&quot;: ele entregou conforto, enquanto o síndico
        esperava conta menor.
      </p>
      <p>
        Climatização é o caso intermediário. Onde há ar-condicionado central ou VRF operando em
        horário fixo, o controle por ocupação e programação costuma ter retorno relevante. Onde
        são splits usados esporadicamente, o ganho é pequeno.
      </p>

      <h2>Como calcular o payback do seu prédio</h2>
      <p>
        Dá para fazer uma estimativa razoável antes de qualquer proposta:
      </p>
      <ul>
        <li>Levante a potência instalada de iluminação das áreas comuns.</li>
        <li>Estime quantas horas por dia ela fica ligada hoje — normalmente mais do que se imagina.</li>
        <li>Estime quantas horas seriam necessárias com acionamento por presença.</li>
        <li>Multiplique a diferença pela tarifa da fatura, não por média de mercado.</li>
        <li>Divida o investimento pela economia mensal. O resultado é o payback em meses.</li>
      </ul>
      <p>
        Se o número passar de 48 meses, provavelmente você está automatizando o lugar errado.
      </p>

      <h2>Ordem de prioridade que costuma funcionar</h2>
      <p>
        Comece pelas áreas comuns de uso intermitente, que têm o melhor retorno e a menor
        complexidade. Depois climatização, onde houver sistema central. Conforto e integração por
        último — quando o sistema já provou valor e existe base instalada para expandir. Não é
        preciso automatizar o prédio inteiro de uma vez, e tentar isso é a forma mais rápida de
        estourar o orçamento.
      </p>
      <p>
        Fazemos esse levantamento antes de propor escopo em{' '}
        <Link to="/servicos/automacao">automação predial e de condomínios</Link>.
      </p>
    </>
  ),

  'nr10-na-pratica-o-que-muda-para-sua-empresa': (
    <>
      <p>
        Existe uma leitura comum e errada da NR-10: a de que ela é assunto do eletricista. A norma
        regulamenta segurança em instalações e serviços em eletricidade, e uma parte relevante das
        obrigações é de quem <em>contrata</em> e de quem é dono da instalação — ou seja, da sua
        empresa.
      </p>

      <h2>O que a norma cobra de quem tem a instalação</h2>
      <p>
        As exigências acompanham o porte. O ponto de corte mais citado é o da carga instalada:
        estabelecimentos acima de 75 kW precisam constituir e manter o Prontuário de Instalações
        Elétricas — um conjunto documental que inclui esquemas unifilares atualizados, documentação
        das inspeções, procedimentos, relação de treinamentos e certificações da equipe.
      </p>
      <p>
        Na prática, o prontuário é o que a fiscalização pede primeiro. E é também o documento que
        quase ninguém tem atualizado, porque ele exige manter registro de cada intervenção — não
        montar uma pasta uma vez.
      </p>

      <h2>O que exigir de quem você contrata</h2>
      <ul>
        <li>
          <strong>Treinamento NR-10 válido.</strong> O curso básico tem carga horária definida em
          norma e exige reciclagem periódica — peça o certificado e confira a data.
        </li>
        <li>
          <strong>Formação complementar para SEP</strong>, quando o serviço envolver sistema
          elétrico de potência.
        </li>
        <li>
          <strong>EPI e EPC adequados</strong>, incluindo vestimenta com proteção contra arco
          elétrico onde o risco existir.
        </li>
        <li>
          <strong>Ordem de serviço e análise de risco</strong> antes da intervenção, não depois.
        </li>
        <li>
          <strong>ART</strong> do responsável técnico para os serviços que a exigem.
        </li>
      </ul>

      <h2>Desenergizar não é só desligar</h2>
      <p>
        A norma trata o estado desenergizado como um procedimento com etapas, não como &quot;virar
        o disjuntor&quot;: seccionamento, impedimento de reenergização, constatação da ausência de
        tensão, aterramento temporário quando aplicável, proteção de elementos energizados próximos
        e sinalização. Equipe que pula etapas está trabalhando fora da norma, mesmo que nada
        aconteça naquele dia.
      </p>

      <h2>Por que isso importa mesmo sem fiscalização</h2>
      <p>
        Em um acidente, a apuração vai atrás da documentação: havia prontuário? A equipe era
        treinada? Existia ordem de serviço? A ausência desses registros transfere responsabilidade
        para a empresa contratante com uma facilidade que costuma surpreender. O custo de estar em
        conformidade é previsível; o de não estar, não.
      </p>

      <h2>Por onde começar</h2>
      <p>
        Levante a carga instalada, verifique se há prontuário e em que estado está, confira a
        validade dos treinamentos de quem entra na sua instalação e estabeleça um inventário do que
        existe hoje. A partir daí, a adequação vira plano — e não emergência.
      </p>
      <p>
        Cuidamos dessa documentação junto com a execução em{' '}
        <Link to="/servicos/eletrica">projetos elétricos</Link>.
      </p>
    </>
  ),
};

export default function BlogPost() {
  const { id } = useParams();
  const artigo = ARTIGO_POR_ID[id];
  const conteudo = CONTEUDOS[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useSEO(
    artigo
      ? {
          title: artigo.title,
          description: artigo.excerpt,
          canonical: `https://msiforce.com.br/blog/${artigo.id}`,
        }
      : {}
  );

  if (!artigo || !conteudo) {
    return (
      <div className="page-post" style={{ paddingTop: '200px', textAlign: 'center' }}>
        <h2>Artigo não encontrado.</h2>
        <Link to="/blog" className="post-back">← Voltar ao Blog</Link>
      </div>
    );
  }

  return (
    <div className="page-post">
      <div className="post-bg" style={{ backgroundImage: `url(${artigo.image})` }}></div>

      <section className="post-hero">
        <motion.div
          className="post-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="post-cat">{artigo.category}</span>
          <h1 className="post-h1">{artigo.title}</h1>
        </motion.div>
      </section>

      <motion.section
        className="post-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {conteudo}

        <Link to="/blog" className="post-back">← Voltar para o Editorial</Link>
      </motion.section>
    </div>
  );
}
