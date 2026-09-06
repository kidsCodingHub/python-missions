import type { Session } from '../types';

const session: Session = {
  id: '06',
  number: 6,
  titleAr: 'اتخاذ القرارات',
  titleEn: 'Making Decisions',
  badgeName: 'Decision Maker',
  badgeColor: '#0060F0',
  badgeIcon: 'GitBranch',
  description: 'تعلّم كتابة فروع if/else، وأهمية النقطتين الرأسيتين والمسافة البادئة.',
  learningGoals: [
    'أكتب فرعين if/else صحيحين',
    'أستخدم : و Indentation بشكل صحيح',
    'أحدّد الفرع المنفّذ لقيم مختلفة',
    'أبني مشير استراحة دراسية'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'Retrieval Arena: Boolean',
      type: 'predict-output',
      goal: 'مراجعة Boolean.',
      question: 'ما ناتج print(10 > 5 and 2 == 2)؟',
      predictCode: 'print(10 > 5 and 2 == 2)',
      expectedOutput: 'True',
      hints: [{ text: 'الشرطان صحيحان.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '10>5 True و2==2 True، and = True.', nextStep: 'اكتب True.' },
        success: { correct: true, what: 'صحيح', why: 'and يعطي True عندما يكون الشرطان صحيحين.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'Concept Discovery: الفرع',
      type: 'multiple-choice',
      goal: 'فهم فكرة الفرع.',
      question: 'في if/else، ماذا يحدث عندما يكون الشرط False؟',
      choices: [
        { id: 'a', text: 'ينفذ كتلة if', explanation: 'خطأ.' },
        { id: 'b', text: 'ينفذ كتلة else', explanation: 'صحيح.' },
        { id: 'c', text: 'لا ينفذ شيئًا', explanation: 'خطأ: else تنفذ.' },
        { id: 'd', text: 'يظهر خطأ', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'else = "وإلا".' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'إذا لم يتحقق شرط if، ينفذ else.', nextStep: 'اختر else.' },
        b: { correct: true, what: 'صحيح', why: 'else ينفذ عندما يكون الشرط False.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'Predict: أي فرع ينفّذ؟',
      type: 'predict-output',
      goal: 'توقع الفرع المنفّذ.',
      question: 'عند x = 5، ما الذي يطبعه الكود؟',
      predictCode: 'x = 5\nif x > 3:\n    print("Big")\nelse:\n    print("Small")',
      expectedOutput: 'Big',
      hints: [{ text: '5 > 3 صحيحة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'x=5 أكبر من 3، لذا ينفذ if.', nextStep: 'اكتب Big.' },
        success: { correct: true, what: 'صحيح', why: 'الشرط x>3 صحيح، لذا ينفذ فرع if.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'Run & Investigate',
      type: 'run-compare',
      goal: 'تشغيل if/else ومقارنته بالتوقع.',
      question: 'شغّل الكود: x=2; if x>3: print("Big") else: print("Small")',
      predictCode: 'x = 2\nif x > 3:\n    print("Big")\nelse:\n    print("Small")',
      expectedOutput: 'Small',
      hints: [{ text: '2 ليست أكبر من 3.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'x=2 ليست أكبر من 3، لذا ينفذ else.', nextStep: 'اكتب Small.' },
        success: { correct: true, what: 'صحيح', why: 'else ينفذ عندما يكون الشرط False.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: 'Misconception: : و Indentation',
      type: 'bug-hunter',
      goal: 'فهم أهمية النقطتين والمسافة البادئة.',
      question: 'أصلح الكود:',
      buggyCode: 'x = 5\nif x > 3\n    print("Big")\nelse\n    print("Small")',
      repairedCode: 'x = 5\nif x > 3:\n    print("Big")\nelse:\n    print("Small")',
      expectedOutput: 'Big',
      hints: [{ text: 'بعد if و else يجب وجود :.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'يفتقد الكود إلى : بعد if/else وربما المسافة البادئة.', nextStep: 'أضف : بعد if و else وتأكد من المسافة البادئة.' },
        success: { correct: true, what: 'صحيح', why: 'النقطتان والمسافة البادئة إلزاميتان في Python.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'Bug Hunter: Indentation',
      type: 'bug-hunter',
      goal: 'إصلاح أخطاء المسافة البادئة.',
      question: 'أصلح الكود:',
      buggyCode: 'x = 10\nif x == 10:\nprint("Equal")\nelse:\nprint("Not equal")',
      repairedCode: 'x = 10\nif x == 10:\n    print("Equal")\nelse:\n    print("Not equal")',
      expectedOutput: 'Equal',
      hints: [{ text: 'الأسطر داخل if/else يجب أن تكون مُزاحة بمسافات.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'Python يتطلب مسافة بادئة للأسطر داخل if/else.', nextStep: 'أضف 4 مسافات قبل print في كلا الفرعين.' },
        success: { correct: true, what: 'صحيح', why: 'المسافة البادئة تحدد أسطر الفرع.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'Guided Practice: اكتب if/else',
      type: 'code-blocks',
      goal: 'كتابة if/else كامل.',
      question: 'رتّب القطع لتكوين برنامج يطبع Even لو الرقم زوجي و Odd لو فردي:',
      codeBlocks: [
        { id: 'n', text: 'n = 4' },
        { id: 'if', text: 'if n % 2 == 0:' },
        { id: 'even', text: '    print("Even")' },
        { id: 'else', text: 'else:' },
        { id: 'odd', text: '    print("Odd")' }
      ],
      correctBlockOrder: ['n', 'if', 'even', 'else', 'odd'],
      hints: [{ text: 'ابدأ بتعريف n، ثم if، ثم else.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'if/else يتطلب ترتيبًا محددًا: if → كتبته → else → كتبته.', nextStep: 'رتّب: n → if → print Even → else → print Odd.' },
        success: { correct: true, what: 'صحيح', why: 'ترتيب if/else صحيح مع المسافة البادئة.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Value Trace: ثلاث قيم',
      type: 'value-trace',
      goal: 'تحديد الفرع المنفذ لقيم مختلفة.',
      question: 'لنفترض score = 85. ما الذي يطبعه الكود؟',
      predictCode: 'score = 85\nif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")',
      traceVariables: [{ name: 'result', steps: ['score=85', '85>=60 True'], final: 'Pass' }],
      expectedOutput: 'Pass',
      hints: [{ text: '85 أكبر أو يساوي 60.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'score=85 يحقق الشرط، لذا ينفذ if.', nextStep: 'اكتب Pass.' },
        success: { correct: true, what: 'صحيح', why: 'الشرط score>=60 صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'Modify: غيّر الشرط',
      type: 'code-repair',
      goal: 'تعديل شرط يغيّر السلوك.',
      question: 'عدّل الكود ليطبع "Adult" بدءًا من العمر 18 (وليس 21):',
      buggyCode: 'age = 20\nif age >= 21:\n    print("Adult")\nelse:\n    print("Not adult")',
      repairedCode: 'age = 20\nif age >= 18:\n    print("Adult")\nelse:\n    print("Not adult")',
      expectedOutput: 'Adult',
      hints: [{ text: 'غيّر 21 إلى 18.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'يجب تغيير الشرط إلى age >= 18.', nextStep: 'استبدل 21 بـ 18.' },
        success: { correct: true, what: 'صحيح', why: 'تغيّر الشرط فعليًا، فتغيّر سلوك البرنامج.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'Sequence: رتّب أسطر if/else',
      type: 'sequence-builder',
      goal: 'ترتيب أسطر if/else مبعثرة.',
      question: 'رتّب الأسطر لتكوين برنامج صحيح:',
      sequenceItems: [
        'temp = 30',
        'if temp > 25:',
        '    print("Hot")',
        'else:',
        '    print("Cool")'
      ],
      correctSequence: [
        'temp = 30',
        'if temp > 25:',
        '    print("Hot")',
        'else:',
        '    print("Cool")'
      ],
      hints: [{ text: 'if يأتي قبل else، وكلاهما يحتاج :.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'if/else يحتاج ترتيبًا محددًا مع : ومسافة بادئة.', nextStep: 'temp → if temp>25: → print Hot → else: → print Cool.' },
        success: { correct: true, what: 'صحيح', why: 'ترتيب if/else صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'Make Project: Study Break Advisor',
      type: 'mini-project',
      goal: 'بناء مشير استراحة دراسية.',
      explanation: 'إذا دقائق المذاكرة >= 45 → استراحة طويلة، وإلا → استراحة قصيرة.',
      question: 'اكتب برنامجك:',
      codeInput: 'minutes = int(input("Study minutes: "))\nif minutes >= 45:\n    print("Long break")\nelse:\n    print("Short break")',
      expectedOutput: '',
      hints: [{ text: 'استخدم if/else فقط.' }, { text: 'لا تستخدم elif.' }],
      feedback: {
        default: { correct: false, what: 'المشروع غير مكتمل.', why: 'يجب قراءة دقائق المذاكرة واستخدام if/else لاختيار نوع الاستراحة.', nextStep: 'استخدم if minutes >= 45: print("Long break") else: print("Short break")' },
        success: { correct: true, what: 'ممتاز!', why: 'استخدمتَ if/else لاتخاذ قرار بناءً على المدخل.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: Decision Maker',
      type: 'multiple-choice',
      goal: 'مراجعة if/else.',
      question: 'أيُّ الكودات يطبع "Yes" عند x = 5؟',
      choices: [
        { id: 'a', text: 'if x > 10:\n    print("Yes")\nelse:\n    print("No")', explanation: 'خطأ: 5 ليست أكبر من 10.' },
        { id: 'b', text: 'if x < 10:\n    print("Yes")\nelse:\n    print("No")', explanation: 'صحيح: 5 أصغر من 10.' },
        { id: 'c', text: 'if x = 5:\n    print("Yes")', explanation: 'خطأ: = في الشرط يسبب خطأ.' },
        { id: 'd', text: 'if x == 10:\n    print("Yes")\nelse:\n    print("No")', explanation: 'خطأ: 5 لا تساوي 10.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'تأكد من الشرط المنطقي.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'يجب أن يكون الشرط صحيحًا عند x=5.', nextStep: 'اختر الشرط x < 10.' },
        b: { correct: true, what: 'صحيح', why: 'x=5 تحقق الشرط x<10.', nextStep: 'التقرير.' }
      }
    }
  ],
  project: {
    title: 'Study Break Advisor',
    description: 'يقرر البرنامج نوع الاستراحة المناسبة بناءً على عدد دقائق المذاكرة باستخدام if/else.',
    requirement: 'استخدم if/else فقط (بدون elif). إذا >= 45 دقيقة → Long break، وإلا → Short break.',
    inputProcessOutput: {
      input: 'minutes',
      process: 'if minutes >= 45 → Long break، else → Short break',
      output: 'نوع الاستراحة'
    },
    starterCode: '# Study Break Advisor\nminutes = int(input("Study minutes: "))\n\nif minutes >= 45:\n    print("Long break")\nelse:\n    print("Short break")',
    testCases: [
      { id: 't1', inputs: ['60'], expectedOutput: 'Long break' },
      { id: 't2', inputs: ['30'], expectedOutput: 'Short break' },
      { id: 't3', inputs: ['45'], expectedOutput: 'Long break' }
    ],
    successCriteria: [
      'استخدام if/else فقط',
      'الحد 45 دقيقة',
      'طباعة نوع الاستراحة الصحيح'
    ],
    hints: [
      { text: 'لا تستخدم elif.' },
      { text: 'تأكد من : والمسافة البادئة.' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'if/else',
      type: 'predict-output',
      question: 'عند x=1، ما الناتج؟ if x>0: print("Positive") else: print("Zero or negative")',
      predictCode: 'x = 1\nif x > 0:\n    print("Positive")\nelse:\n    print("Zero or negative")',
      expectedOutput: 'Positive',
      hints: [{ text: '1 > 0 صحيحة.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '1>0 True.', nextStep: 'اكتب Positive.' }, success: { correct: true, what: 'صحيح', why: 'if ينفذ.', nextStep: 'التالي.' } }
    },
    {
      id: 'b2',
      title: 'النقطتان',
      type: 'bug-hunter',
      question: 'أصلح: if x == 5\n    print("Five")',
      buggyCode: 'x = 5\nif x == 5\n    print("Five")',
      repairedCode: 'x = 5\nif x == 5:\n    print("Five")',
      expectedOutput: 'Five',
      hints: [{ text: 'بعد if يجب :.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'يفتقد : بعد if.', nextStep: 'أضف :.' }, success: { correct: true, what: 'صحيح', why: ': إلزامية.', nextStep: 'التالي.' } }
    },
    {
      id: 'b3',
      title: 'Indentation',
      type: 'bug-hunter',
      question: 'أصلح المسافة البادئة: if x==5: print("Five") else: print("Other")',
      buggyCode: 'x = 5\nif x == 5:\nprint("Five")\nelse:\nprint("Other")',
      repairedCode: 'x = 5\nif x == 5:\n    print("Five")\nelse:\n    print("Other")',
      expectedOutput: 'Five',
      hints: [{ text: 'أضف 4 مسافات قبل print.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'print يحتاج مسافة بادئة.', nextStep: 'أضف مسافات.' }, success: { correct: true, what: 'صحيح', why: 'المسافة البادئة صحيحة.', nextStep: 'التالي.' } }
    },
    {
      id: 'b4',
      title: 'else',
      type: 'predict-output',
      question: 'عند score=50، ما الناتج؟ if score>=60: print("Pass") else: print("Fail")',
      predictCode: 'score = 50\nif score >= 60:\n    print("Pass")\nelse:\n    print("Fail")',
      expectedOutput: 'Fail',
      hints: [{ text: '50 < 60.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '50 أصغر من 60، else ينفذ.', nextStep: 'اكتب Fail.' }, success: { correct: true, what: 'صحيح', why: 'else ينفذ.', nextStep: 'التالي.' } }
    },
    {
      id: 'b5',
      title: 'تعديل شرط',
      type: 'code-repair',
      question: 'اجعل الكود يطبق "Hot" من temp>=25 بدلًا من 30:',
      buggyCode: 'temp = 28\nif temp >= 30:\n    print("Hot")\nelse:\n    print("Cool")',
      repairedCode: 'temp = 28\nif temp >= 25:\n    print("Hot")\nelse:\n    print("Cool")',
      expectedOutput: 'Hot',
      hints: [{ text: 'غيّر 30 إلى 25.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'يجب تغيير الحد إلى 25.', nextStep: 'استخدم temp >= 25.' }, success: { correct: true, what: 'صحيح', why: 'تغيّر الشرط فعليًا.', nextStep: 'انتهى.' } }
    }
  ]
};

export default session;
