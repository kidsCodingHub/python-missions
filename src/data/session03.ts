import type { Session } from '../types';

const session: Session = {
  id: '03',
  number: 3,
  titleAr: 'الأرقام والعمليات',
  titleEn: 'Numbers & Operators',
  badgeName: 'Number Cruncher',
  badgeColor: '#F0A800',
  badgeIcon: 'Calculator',
  description: 'تعلّم العمليات الحسابية في Python واختلاف / و // و % و **، وأولوية العمليات.',
  learningGoals: [
    'أستخدم العمليات + - * / // % ** بشكل صحيح',
    'أفرّق بين القسمة العادية والصحيحة والباقي',
    'أحسب تعبيرات متعددة باستخدام Precedence',
    'أبني حاسبة ميزانية جيب بسيطة'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'Retrieval Arena: مراجعة سريعة',
      type: 'bug-hunter',
      goal: 'مراجعة input() والأنواع.',
      question: 'أصلح الكود ليطبع ناتج جمع رقمين:',
      buggyCode: 'a = input("First: ")\nb = input("Second: ")\nprint(a + b)',
      repairedCode: 'a = int(input("First: "))\nb = int(input("Second: "))\nprint(a + b)',
      expectedOutput: '',
      hints: [{ text: 'input() يرجع نصًا؛ لجمع الأرقام حوّلها إلى int.' }],
      feedback: {
        default: { correct: false, what: 'الإصلاح غير كامل.', why: 'a + b عندما يكونان نصًا ينتج ".concatenation" وليس جمعًا رقميًا.', nextStep: 'استخدم int() حول input().' },
        success: { correct: true, what: 'صحيح!', why: 'int(input()) يحوّل المدخلات إلى أرقام قبل الجمع.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'Concept Discovery: العمليات الأساسية',
      type: 'multiple-choice',
      goal: 'فهم العمليات الأساسية.',
      question: 'ما ناتج 8 / 2 في Python 3؟',
      choices: [
        { id: 'a', text: '4', explanation: 'خطأ: / يرجع float.' },
        { id: 'b', text: '4.0', explanation: 'صحيح: القسمة بـ / ترجع دائمًا float.' },
        { id: 'c', text: '4.5', explanation: 'خطأ.' },
        { id: 'd', text: '0', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'في Python 3، / دائمًا تعطي float.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '8 / 2 = 4.0 لأن / ترجع float.', nextStep: 'اختر 4.0.' },
        b: { correct: true, what: 'صحيح', why: '/ ترجع float حتى لو الناتج صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'Predict: توقع النتائج',
      type: 'predict-output',
      goal: 'توقع نتائج تعبيرات رقمية.',
      question: 'ما ناتج الكود؟ print(3 + 4 * 2)',
      predictCode: 'print(3 + 4 * 2)',
      expectedOutput: '11',
      hints: [{ text: 'الضرب أولوية على الجمع.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '4 * 2 = 8 ثم + 3 = 11.', nextStep: 'اكتب 11.' },
        success: { correct: true, what: 'صحيح', why: 'الضرب أولًا: 4*2=8 ثم +3=11.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'Run & Investigate',
      type: 'run-compare',
      goal: 'تشغيل التعبيرات ومقارنتها بالتوقع.',
      question: 'اكتب الناتج المتوقع ثم شغّل: print(10 - 2 + 3)',
      predictCode: 'print(10 - 2 + 3)',
      expectedOutput: '11',
      hints: [{ text: 'من اليسار لليمين عندما الأولوية متساوية.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '10-2=8 ثم +3=11.', nextStep: 'اكتب 11.' },
        success: { correct: true, what: 'صحيح', why: 'العمليات متساوية الأولوية من اليسار لليمين.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: 'Concept Discovery: // و %',
      type: 'multiple-choice',
      goal: 'فهم القسمة الصحيحة والباقي.',
      question: 'ما ناتج 17 // 5؟',
      choices: [
        { id: 'a', text: '3.4', explanation: 'خطأ: هذا ناتج /.' },
        { id: 'b', text: '3', explanation: 'صحيح: // تعطي الجزء الصحيح من القسمة.' },
        { id: 'c', text: '2', explanation: 'خطأ.' },
        { id: 'd', text: '5', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: '// = quotient الصحيح.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '17 // 5 = 3 (القسمة الصحيحة).', nextStep: 'اختر 3.' },
        b: { correct: true, what: 'صحيح', why: '// تعطي عدد المرات الكامل فقط.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'Misconception Mission: / vs // vs %',
      type: 'multiple-choice',
      goal: 'كشف الخلط بين العمليات.',
      question: 'ما ناتج 17 % 5؟',
      choices: [
        { id: 'a', text: '3', explanation: 'خطأ: هذا ناتج //.' },
        { id: 'b', text: '2', explanation: 'صحيح: 17 = 5*3 + 2، الباقي 2.' },
        { id: 'c', text: '3.4', explanation: 'خطأ: هذا ناتج /.' },
        { id: 'd', text: '0', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: '% يعطي الباقي بعد القسمة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '% يعطي الباقي: 17 - 15 = 2.', nextStep: 'اختر 2.' },
        b: { correct: true, what: 'صحيح', why: '17 % 5 = 2 (الباقي).', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'Value Trace: Precedence',
      type: 'value-trace',
      goal: 'تتبع أولوية العمليات.',
      question: 'ما الناتج النهائي؟',
      predictCode: 'result = 2 + 3 * 4',
      traceVariables: [{ name: 'result', steps: ['3*4=12', '2+12=14'], final: '14' }],
      expectedOutput: '14',
      hints: [{ text: 'الضرب قبل الجمع.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'الضرب أولوية أعلى: 3*4=12 ثم 2+12=14.', nextStep: 'اكتب 14.' },
        success: { correct: true, what: 'صحيح', why: 'الضرب يسبق الجمع.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Guided Practice: الأس **',
      type: 'predict-output',
      goal: 'استخدام **.',
      question: 'ما ناتج 2 ** 3؟',
      predictCode: 'print(2 ** 3)',
      expectedOutput: '8',
      hints: [{ text: '** يعني "أُس".' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '2**3 = 2×2×2 = 8.', nextStep: 'اكتب 8.' },
        success: { correct: true, what: 'صحيح', why: '** هو الأس.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'Sequence: رتّب خطوات الحل',
      type: 'sequence-builder',
      goal: 'ترتيب خطوات حل مسألة حسابية.',
      question: 'رتّب خطوات حساب المتوسط لثلاثة درجات:',
      sequenceItems: [
        'اقرأ الدرجة الأولى',
        'اقرأ الدرجة الثانية',
        'اقرأ الدرجة الثالثة',
        'اجمع الدرجات',
        'اقسم المجموع على 3'
      ],
      correctSequence: [
        'اقرأ الدرجة الأولى',
        'اقرأ الدرجة الثانية',
        'اقرأ الدرجة الثالثة',
        'اجمع الدرجات',
        'اقسم المجموع على 3'
      ],
      hints: [{ text: 'لا يمكن الجمع قبل قراءة جميع الدرجات.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'يجب قراءة القيم أولًا ثم الجمع ثم القسمة.', nextStep: 'رتّب: قراءة → قراءة → قراءة → جمع → قسمة.' },
        success: { correct: true, what: 'صحيح', why: 'ترتيب حساب المتوسط صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'Bug Hunter: Precedence & Operators',
      type: 'bug-hunter',
      goal: 'إصلاح أخطاء العمليات.',
      question: 'المطلوب: قسمة صحيحة لـ 10 على 3. أصلح الكود:',
      buggyCode: 'print(10 / 3)',
      repairedCode: 'print(10 // 3)',
      expectedOutput: '3',
      hints: [{ text: 'القسمة الصحيحة تستخدم //.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '/ يعطي 3.333... بينما // يعطي 3.', nextStep: 'استخدم // بدل /.' },
        success: { correct: true, what: 'صحيح', why: '// تعطي الجزء الصحيح 3.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'Make Project: Pocket Budget Calculator',
      type: 'mini-project',
      goal: 'حاسبة ميزانية جيب.',
      explanation: 'أدخل الدخل والمصروفات واحسب المتبقي.',
      question: 'اكتب برنامجك:',
      codeInput: 'income = float(input("Income: "))\nfood = float(input("Food: "))\ntransport = float(input("Transport: "))\nremaining = income - (food + transport)\nprint("Remaining:", remaining)',
      expectedOutput: '',
      hints: [{ text: 'استخدم float للمدخلات.' }, { text: 'المتبقي = الدخل - مجموع المصروفات.' }],
      feedback: {
        default: { correct: false, what: 'المشروع غير مكتمل.', why: 'يجب قراءة الدخل والمصروفات وحساب المتبقي.', nextStep: 'استخدم float(input()) لكل مدخل ثم اطرح المجموع من الدخل.' },
        success: { correct: true, what: 'ممتاز!', why: 'حاسبة الميزانية تعمل بشكل صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: Number Cruncher',
      type: 'multiple-choice',
      goal: 'مراجعة العمليات.',
      question: 'ما ناتج 7 % 3؟',
      choices: [
        { id: 'a', text: '1', explanation: 'صحيح: 7 = 3*2 + 1.' },
        { id: 'b', text: '2', explanation: 'خطأ: هذا ناتج //.' },
        { id: 'c', text: '2.33', explanation: 'خطأ: هذا ناتج /.' },
        { id: 'd', text: '0', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '% = الباقي.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '7 % 3 = 1.', nextStep: 'اختر 1.' },
        a: { correct: true, what: 'صحيح', why: '7 = 3*2 + 1، الباقي 1.', nextStep: 'التقرير.' }
      }
    }
  ],
  project: {
    title: 'Pocket Budget Calculator',
    description: 'حاسبة بسيطة لحساب المتبقي من ميزانية الجيب بعد المصروفات.',
    requirement: 'اقرأ الدخل ومصروفين على الأقل، ثم احسب واطبع المتبقي.',
    inputProcessOutput: {
      input: 'income, food, transport (أو مصروفات أخرى)',
      process: 'حساب remaining = income - (food + transport + ...)',
      output: 'قيمة المتبقي'
    },
    starterCode: '# Pocket Budget Calculator\nincome = float(input("Income: "))\nfood = float(input("Food: "))\ntransport = float(input("Transport: "))\n\ntotal_expenses = food + transport\nremaining = income - total_expenses\n\nprint("Total expenses:", total_expenses)\nprint("Remaining:", remaining)',
    testCases: [
      { id: 't1', inputs: ['100', '30', '20'], expectedOutput: 'Remaining: 50.0' },
      { id: 't2', inputs: ['100', '30', '20'], expectedOutput: 'Total expenses: 50.0' }
    ],
    successCriteria: [
      'قراءة الدخل والمصروفات',
      'حساب المتبقي بشكل صحيح',
      'طباعة النتيجة بوضوح'
    ],
    hints: [
      { text: 'تذكر استخدام float() أو int().' },
      { text: 'تأكد من أولوية الأقواس.' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'القسمة',
      type: 'multiple-choice',
      question: 'ما ناتج 9 / 2 في Python 3؟',
      choices: [
        { id: 'a', text: '4.5', explanation: 'صحيح.' },
        { id: 'b', text: '4', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '/ يعطي float.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '/ يعطي float.', nextStep: 'اختر 4.5.' }, a: { correct: true, what: 'صحيح', why: '9/2 = 4.5.', nextStep: 'التالي.' } }
    },
    {
      id: 'b2',
      title: 'الباقي',
      type: 'predict-output',
      question: 'ما ناتج 10 % 4؟',
      predictCode: 'print(10 % 4)',
      expectedOutput: '2',
      hints: [{ text: '% = الباقي.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '10 = 4*2 + 2.', nextStep: 'اكتب 2.' }, success: { correct: true, what: 'صحيح', why: 'الباقي 2.', nextStep: 'التالي.' } }
    },
    {
      id: 'b3',
      title: 'أولوية',
      type: 'predict-output',
      question: 'ما ناتج 4 + 2 * 3؟',
      predictCode: 'print(4 + 2 * 3)',
      expectedOutput: '10',
      hints: [{ text: 'الضرب أولًا.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '2*3=6 ثم 4+6=10.', nextStep: 'اكتب 10.' }, success: { correct: true, what: 'صحيح', why: 'الضرب أولوية أعلى.', nextStep: 'التالي.' } }
    },
    {
      id: 'b4',
      title: 'الأس',
      type: 'predict-output',
      question: 'ما ناتج 3 ** 2؟',
      predictCode: 'print(3 ** 2)',
      expectedOutput: '9',
      hints: [{ text: '** = أُس.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '3**2 = 9.', nextStep: 'اكتب 9.' }, success: { correct: true, what: 'صحيح', why: '3 مربع = 9.', nextStep: 'التالي.' } }
    },
    {
      id: 'b5',
      title: 'إصلاح',
      type: 'bug-hunter',
      question: 'المطلوب قسمة صحيحة: 15 // 4. أصلح:',
      buggyCode: 'print(15 / 4)',
      repairedCode: 'print(15 // 4)',
      expectedOutput: '3',
      hints: [{ text: 'استخدم // للقسمة الصحيحة.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '/ يعطي 3.75.', nextStep: 'استخدم //.' }, success: { correct: true, what: 'صحيح', why: '15 // 4 = 3.', nextStep: 'انتهى.' } }
    }
  ]
};

export default session;
