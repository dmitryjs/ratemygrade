export type GradeKey = "junior" | "middle" | "middle_plus" | "senior" | "team_lead"

export type MatrixItem = {
  id: string
  text: string
}

export type MatrixCompetency = {
  id: string
  title: string
  cells: Record<GradeKey, MatrixItem[]>
}

export const grades: { key: GradeKey; label: string }[] = [
  { key: "junior", label: "Junior" },
  { key: "middle", label: "Middle" },
  { key: "middle_plus", label: "Middle +" },
  { key: "senior", label: "Senior" },
  { key: "team_lead", label: "Team Lead" },
]

export const competencies: MatrixCompetency[] = [
  {
    id: "task_complexity",
    title: "Сложность задач",
    cells: {
      junior: [
        {
          id: "task_complexity.junior.1",
          text: "Решает небольшие предсказуемые задачи по чёткому ТЗ под присмотром наставника",
        },
        {
          id: "task_complexity.junior.2",
          text: "Например: собрать согласованный компонент в дизайн‑системе или отрисовать отдельный блок",
        },
      ],
      middle: [
        {
          id: "task_complexity.middle.1",
          text: "Решает задачи с чёткой формулировкой и небольшим уровнем неопределённости",
        },
        {
          id: "task_complexity.middle.2",
          text: "Работает с наставником по рискам/направлению (например, «нарисовать мобильную версию фичи»)",
        },
      ],
      middle_plus: [
        {
          id: "task_complexity.middle_plus.1",
          text: "Решает задачи со средним уровнем неопределённости, собирает критичную массу информации перед решением",
        },
        {
          id: "task_complexity.middle_plus.2",
          text: "Прорабатывает фичу, затрагивающую несколько частей интерфейса (учитывает зависимости/ограничения)",
        },
      ],
      senior: [
        {
          id: "task_complexity.senior.1",
          text: "Решает задачи с высоким уровнем неопределённости, формулирует проблему и критерии успеха",
        },
        {
          id: "task_complexity.senior.2",
          text: "Влияет на направление продукта/разработки, проводит задачи через согласованный процесс",
        },
        {
          id: "task_complexity.senior.3",
          text: "Самостоятельно закрывает значимую область ответственности (например, дизайн‑система/раздел админки)",
        },
      ],
      team_lead: [
        {
          id: "task_complexity.team_lead.1",
          text: "Решает задачи с любой степенью неопределённости и сложные концептуальные задачи",
        },
        {
          id: "task_complexity.team_lead.2",
          text: "Строит план и методологию решения, помогает продакту/CTO прорабатывать цели и технические ограничения",
        },
        {
          id: "task_complexity.team_lead.3",
          text: "Анализирует потребности и строит план реализации вместе со стейкхолдерами (продукт/разработка/бизнес)",
        },
      ],
    },
  },
  {
    id: "problem_solving",
    title: "Процесс решения задач",
    cells: {
      junior: [
        {
          id: "problem_solving.junior.1",
          text: "Предлагает варианты решения, чтобы выбрать лучший",
        },
        { id: "problem_solving.junior.2", text: "Самостоятелен в своих задачах (не теряется, доводит до результата)" },
        { id: "problem_solving.junior.3", text: "Внимателен к деталям, перепроверяет результат" },
      ],
      middle: [
        {
          id: "problem_solving.middle.1",
          text: "Рассматривает весь спектр возможных решений",
        },
        { id: "problem_solving.middle.2", text: "Учитывает в решениях возможности и ограничения продукта/технологий" },
        { id: "problem_solving.middle.3", text: "Аргументирует плюсы/минусы решений и последствия" },
        { id: "problem_solving.middle.4", text: "Проактивен: сам задаёт вопросы → действует" },
        { id: "problem_solving.middle.5", text: "Менеджмент задач: балансирует нагрузку, ведёт свои задачи" },
      ],
      middle_plus: [
        {
          id: "problem_solving.middle_plus.1",
          text: "Быстро предлагает новые варианты в рамках ограничений; гибкость — часть работы",
        },
        { id: "problem_solving.middle_plus.2", text: "Использует метод прогрессивного раскрытия (итерации вместо «сразу идеально»)" },
      ],
      senior: [
        {
          id: "problem_solving.senior.1",
          text: "Помогает решать задачи коллегам, к нему часто приходят за советом",
        },
        {
          id: "problem_solving.senior.2",
          text: "Сильная презентация: умеет обосновывать и доносить мысли/идеи",
        },
      ],
      team_lead: [
        {
          id: "problem_solving.team_lead.1",
          text: "Внедряет процессы и улучшает методологии решения задач",
        },
        {
          id: "problem_solving.team_lead.2",
          text: "Проводит ревью задач, помогает дизайнерам быстрее встроиться в процессы",
        },
      ],
    },
  },
  {
    id: "quality",
    title: "Качество результата",
    cells: {
      junior: [
        {
          id: "quality.junior.1",
          text: "Работа часто пересматривается с качественной обратной связью от руководителя/ментора",
        },
        { id: "quality.junior.2", text: "Нужна помощь в определении логики и UI" },
      ],
      middle: [
        { id: "quality.middle.1", text: "Предлагает минимум 2 решения (по требованиям и из идей)" },
        { id: "quality.middle.2", text: "Нужен периодический пересмотр/корректировка направления" },
        { id: "quality.middle.3", text: "Сдаёт макеты аккуратно: консистентность, состояния, крайние случаи" },
      ],
      middle_plus: [
        { id: "quality.middle_plus.1", text: "Требуется помощь в системных задачах, затрагивающих других участников команды" },
        { id: "quality.middle_plus.2", text: "Сам замечает деградации качества и инициирует улучшения (гайд/ревью/чеклист)" },
      ],
      senior: [
        { id: "quality.senior.1", text: "Требуется помощь в крупных абстрактных задачах (например, новая идея/фича)" },
        { id: "quality.senior.2", text: "Помогает тимлиду с контролем качества (в команде/на проекте)" },
        { id: "quality.senior.3", text: "Выстраивает критерии качества и «definition of done» для дизайна" },
      ],
      team_lead: [
        { id: "quality.team_lead.1", text: "Контролирует качество результатов команды, повышает уровень дизайнеров и помогает в развитии" },
        { id: "quality.team_lead.2", text: "Масштабирует практики качества на команду/несколько команд" },
      ],
    },
  },
  {
    id: "visual_ui",
    title: "Визуальный дизайн (UI)",
    cells: {
      junior: [
        { id: "visual_ui.junior.1", text: "База: композиция, цвет, отступы, сетки, шрифты, адаптации (Figma)" },
        { id: "visual_ui.junior.2", text: "Создаёт простые анимации" },
        { id: "visual_ui.junior.3", text: "Знаком с документацией продукта" },
        { id: "visual_ui.junior.4", text: "Тренирует насмотренность и использует референсы" },
        { id: "visual_ui.junior.5", text: "Использует стайлгайд/компоненты и не «изобретает» без причины" },
      ],
      middle: [
        { id: "visual_ui.middle.1", text: "В решениях управляет вниманием людей (иерархия/контраст)" },
        { id: "visual_ui.middle.2", text: "Следит за трендами и умеет применять их уместно" },
        { id: "visual_ui.middle.3", text: "Понимает принципы (веб-)анимации" },
        { id: "visual_ui.middle.4", text: "Работает с кернингом/треккингом, улучшает читаемость" },
        { id: "visual_ui.middle.5", text: "Работает с компонентами, дизайн‑токенами и переменными" },
        { id: "visual_ui.middle.6", text: "Делает визуал без постоянных правок: композиция/типографика/сетку держит стабильно" },
      ],
      middle_plus: [
        { id: "visual_ui.middle_plus.1", text: "Интерпретирует тренды в дизайн‑системе и своих решениях" },
        { id: "visual_ui.middle_plus.2", text: "Понимает форму/текстуру/типографику и влияние на восприятие" },
        { id: "visual_ui.middle_plus.3", text: "Вносит изменения в визуальный стиль дизайн‑системы продукта" },
        { id: "visual_ui.middle_plus.4", text: "Точно описывает визуальный стиль и принципы разработки дизайна" },
        { id: "visual_ui.middle_plus.5", text: "Создаёт/обновляет гайды (компоненты, стили, правила использования)" },
      ],
      senior: [
        { id: "visual_ui.senior.1", text: "Уверенно работает с метафорой/абстракцией и объясняет решения" },
        { id: "visual_ui.senior.2", text: "Использует анимацию/динамику как часть UX и ценности" },
        { id: "visual_ui.senior.3", text: "Транслирует ценности бренда через визуальные решения" },
        { id: "visual_ui.senior.4", text: "Может научить визуалу: объясняет правилами и фактами, а не «мне кажется»" },
      ],
      team_lead: [
        { id: "visual_ui.team_lead.1", text: "Помогает арт‑директору с видением или замещает его функцию" },
        { id: "visual_ui.team_lead.2", text: "Презентует (pitch deck / investor deck и т.п.)" },
        { id: "visual_ui.team_lead.3", text: "Формирует визуальную планку команды и калибрует вкус через ревью" },
      ],
    },
  },
  {
    id: "ux",
    title: "Пользовательский опыт (UX)",
    cells: {
      junior: [
        { id: "ux.junior.1", text: "Понимает основы анализа пользовательских потребностей и поведения" },
        { id: "ux.junior.2", text: "Обладает системным мышлением" },
        { id: "ux.junior.3", text: "Понимает разницу между задачей пользователя и задачей бизнеса" },
      ],
      middle: [
        { id: "ux.middle.1", text: "Создаёт понятные интерфейсы на основе анализа поведения/потребностей" },
        { id: "ux.middle.2", text: "Прорабатывает User Flow под задачу (сценарии)" },
        { id: "ux.middle.3", text: "Знает популярные паттерны (включая dark patterns)" },
        { id: "ux.middle.4", text: "Видит и проектирует edge cases / ошибки / пустые состояния" },
      ],
      middle_plus: [
        { id: "ux.middle_plus.1", text: "Умеет улучшать UX на основе анализа конкурентов/контекста" },
        { id: "ux.middle_plus.2", text: "Строит вайрфреймы и прототипы для тестирования" },
        { id: "ux.middle_plus.3", text: "Пишет технические тексты для интерфейсов (в информ. стиле)" },
        { id: "ux.middle_plus.4", text: "Проводит простые UX-тесты и умеет превращать выводы в решения" },
      ],
      senior: [
        { id: "ux.senior.1", text: "Думает о консистентном пользовательском опыте в рамках сервиса" },
        { id: "ux.senior.2", text: "Строит Customer Journey Map и определяет UX на уровне продукта" },
        { id: "ux.senior.3", text: "Экспертно использует фреймворки (JTBD/CJM/Personas) и проверяет качество артефактов" },
      ],
      team_lead: [
        { id: "ux.team_lead.1", text: "Помогает формировать стратегию развития пользовательского опыта продукта" },
        { id: "ux.team_lead.2", text: "Проектирует CX и создаёт точечные решения за пределами интерфейса" },
        { id: "ux.team_lead.3", text: "Встраивает UX-исследования в процесс команды и защищает их ценность бизнесу" },
      ],
    },
  },
  {
    id: "product_orientation",
    title: "Ориентация на продукт и метрики",
    cells: {
      junior: [
        { id: "product_orientation.junior.1", text: "Понимает, что дизайн должен решать боли пользователей и задачи бизнеса" },
        { id: "product_orientation.junior.2", text: "Задает базовые вопросы: «зачем это нужно пользователю?»" },
      ],
      middle: [
        { id: "product_orientation.middle.1", text: "Учитывает, какие метрики затрагивает решение, и не боится откатить плохое" },
        { id: "product_orientation.middle.2", text: "Собирает структуру/лендинг от нужд продукта и конкурентных преимуществ" },
        { id: "product_orientation.middle.3", text: "Проводит интервью/сбор фидбека под присмотром или по готовому гайду" },
      ],
      middle_plus: [
        { id: "product_orientation.middle_plus.1", text: "Сам инициирует и проводит интервью, определяет респондентов и вопросы" },
        { id: "product_orientation.middle_plus.2", text: "Принимает решения на основе метрик/данных, а не только «чуйки»" },
        { id: "product_orientation.middle_plus.3", text: "Коммуницирует с продактом на языке целей, ограничений и результатов" },
      ],
      senior: [
        { id: "product_orientation.senior.1", text: "Может обучить интервьюированию и найти ошибки в исследовании" },
        { id: "product_orientation.senior.2", text: "Помогает команде выбирать метрики и строить гипотезы/эксперименты" },
        { id: "product_orientation.senior.3", text: "Выступает партнёром для бизнеса: челленджит постановку, предлагает альтернативы" },
      ],
      team_lead: [
        { id: "product_orientation.team_lead.1", text: "Мастер в интервьюировании и метриках; держит продуктовый фокус команды" },
        { id: "product_orientation.team_lead.2", text: "Строит систему принятия решений: исследования → гипотезы → метрики → итоги" },
      ],
    },
  },
  {
    id: "ai_tooling",
    title: "AI-инструменты и вайбкодинг (bonus)",
    cells: {
      junior: [
        { id: "ai_tooling.junior.1", text: "Использует AI для черновиков (копирайт/варианты) и умеет проверять результат" },
      ],
      middle: [
        { id: "ai_tooling.middle.1", text: "Собирает промпты под задачу, умеет итеративно улучшать ответы" },
        { id: "ai_tooling.middle.2", text: "Использует AI для быстрых прототипов/вайрфреймов и сравнения вариантов" },
      ],
      middle_plus: [
        { id: "ai_tooling.middle_plus.1", text: "Понимает ограничения моделей и строит процесс: контекст → критерии → проверка" },
        { id: "ai_tooling.middle_plus.2", text: "Автоматизирует рутину (шаблоны, генерация вариантов, чеклисты)" },
      ],
      senior: [
        { id: "ai_tooling.senior.1", text: "Встраивает AI в дизайн‑процесс команды и повышает throughput без потери качества" },
      ],
      team_lead: [
        { id: "ai_tooling.team_lead.1", text: "Определяет правила использования AI (безопасность, качество, приватность) и масштабирует практику" },
      ],
    },
  },
  {
    id: "product_knowledge",
    title: "Знание продукта",
    cells: {
      junior: [
        { id: "product_knowledge.junior.1", text: "Понимает, какую проблему решает продукт для пользователей" },
        { id: "product_knowledge.junior.2", text: "Активно пользуется продуктом сам" },
      ],
      middle: [
        { id: "product_knowledge.middle.1", text: "Следит за конкурентами, анализирует их решения и учится" },
        { id: "product_knowledge.middle.2", text: "Понимает базовую структуру продажи продукта и потребности клиентов" },
      ],
      middle_plus: [
        { id: "product_knowledge.middle_plus.1", text: "Делится знаниями о решениях конкурентов, задаёт вопрос «зачем мы это делаем?»" },
        { id: "product_knowledge.middle_plus.2", text: "Оценивает сценарии части системы, риски и сроки выполнения задач" },
      ],
      senior: [
        { id: "product_knowledge.senior.1", text: "Владеет уникальным техническим знанием внутри продукта (например, дизайн‑система)" },
        { id: "product_knowledge.senior.2", text: "Видит сильные/слабые места продукта и точки роста" },
        { id: "product_knowledge.senior.3", text: "Способен писать дизайн‑документацию по продукту" },
      ],
      team_lead: [
        { id: "product_knowledge.team_lead.1", text: "Умеет отвечать на сложные вопросы о продукте" },
        { id: "product_knowledge.team_lead.2", text: "Знаком с ключевыми бизнес‑метриками продукта" },
      ],
    },
  },
  {
    id: "growth_and_team",
    title: "Развитие себя и коллег, работа в команде",
    cells: {
      junior: [
        { id: "growth_and_team.junior.1", text: "Принимает обратную связь и системно работает над точками роста" },
        { id: "growth_and_team.junior.2", text: "Формулирует проблему и задаёт вопросы, которые помогают решить задачу" },
        { id: "growth_and_team.junior.3", text: "Не замалчивает проблемы и делится ими" },
      ],
      middle: [
        { id: "growth_and_team.middle.1", text: "Вместе с руководителем формирует личный план развития" },
        { id: "growth_and_team.middle.2", text: "Берёт задачи, которые раньше не делал, чтобы расти" },
        { id: "growth_and_team.middle.3", text: "Понимает, когда нужна проактивная работа со старшим, а когда можно самому" },
      ],
      middle_plus: [
        { id: "growth_and_team.middle_plus.1", text: "Участвует в наставничестве junior дизайнеров" },
        { id: "growth_and_team.middle_plus.2", text: "Совместно с руководителем определяет зоны роста и развивает их" },
        { id: "growth_and_team.middle_plus.3", text: "Активный участник командных встреч, задаёт правильные вопросы" },
      ],
      senior: [
        { id: "growth_and_team.senior.1", text: "Может анализировать и проводить ревью дизайн‑макетов и компетенций коллег" },
        { id: "growth_and_team.senior.2", text: "Владеет навыком публичных выступлений" },
        { id: "growth_and_team.senior.3", text: "Вовлечён в улучшение процессов в команде" },
      ],
      team_lead: [
        { id: "growth_and_team.team_lead.1", text: "Для фидбека пользуется наводящими вопросами, в меньшей степени советами" },
        { id: "growth_and_team.team_lead.2", text: "Развивает софт‑скиллы команды: выступления, коммуникация, мотивация" },
        { id: "growth_and_team.team_lead.3", text: "Понимает, как устроены процессы в других командах и работает на стыке" },
      ],
    },
  },
  {
    id: "communication",
    title: "Коммуникация",
    cells: {
      junior: [{ id: "communication.junior.1", text: "Коммуницирует с тим‑лидом и менеджером" }],
      middle: [{ id: "communication.middle.1", text: "Коммуницирует с менеджером, аналитиком, тим‑лидом и разработчиком" }],
      middle_plus: [{ id: "communication.middle_plus.1", text: "Коммуницирует с менеджером, продактом, аналитиком, тим‑лидом и всей командой" }],
      senior: [
        { id: "communication.senior.1", text: "Коммуницирует со всей командой (от продакта до QA)" },
        { id: "communication.senior.2", text: "Может взаимодействовать с внешним заказчиком или аутсорс командой" },
      ],
      team_lead: [
        { id: "communication.team_lead.1", text: "Коммуницирует со всей командой, CTO, тим‑лидами и бизнесом" },
        { id: "communication.team_lead.2", text: "Может взаимодействовать с внешним заказчиком или аутсорс командой" },
      ],
    },
  },
  {
    id: "ownership",
    title: "Ответственность за результат",
    cells: {
      junior: [{ id: "ownership.junior.1", text: "Если ошибся — делает выводы и учится на них" }],
      middle: [
        { id: "ownership.middle.1", text: "Берёт ответственность за область задач, над которой работает" },
        { id: "ownership.middle.2", text: "Вовремя сигнализирует о риске срыва сроков или невыполнения задач" },
        { id: "ownership.middle.3", text: "Проводит менеджмент задач в Jira/процессах" },
      ],
      middle_plus: [
        { id: "ownership.middle_plus.1", text: "Самостоятельно реализует задачу и валидирует ожидаемый результат" },
        { id: "ownership.middle_plus.2", text: "Прошёл дизайн‑ревью и проверено соответствие техническим требованиям" },
      ],
      senior: [
        { id: "ownership.senior.1", text: "Берёт ответственность за ведение работ по дизайну проекта/фичи" },
        { id: "ownership.senior.2", text: "Вовлечён в разбор проблем и помогает другим командам на стыке зон ответственности" },
      ],
      team_lead: [
        { id: "ownership.team_lead.1", text: "Выступает ответственным за работу других в рамках зоны" },
        { id: "ownership.team_lead.2", text: "Ответственен за эффективность работы своей команды" },
      ],
    },
  },
]

