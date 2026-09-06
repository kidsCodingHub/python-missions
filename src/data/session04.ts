import type { Session } from '../types';

const session: Session = {
  id: '04',
  number: 4,
  titleAr: 'نصوص تتكلم',
  titleEn: 'Strings That Talk',
  badgeName: 'String Stylist',
  badgeColor: '#F04800',
  badgeIcon: 'Type',
  description: 'تعلّم التعامل مع النصوص: الدمج، التكرار، Escape Sequences، وf-strings.',
  learningGoals: [
    'أدمج النصوص باستخدام + مع تحويل الأرقام',
    'أكرر نصًا باستخدام *',
    'أستخدم Escape Sequences بشكل صحيح',
    'أنسّق Output باستخدام f-strings و sep و end'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'Retrieval Arena: مراجعة',
      type: 'multiple-choice',
      goal: 'مراجعة أنواع input() والمتغيرات.',
      question: 'ما نوع ناتج input()؟',
      choices: [
        { id: 'a', text: 'int', explanation: 'خطأ.' },
        { id: 'b', text: 'str', explanation: 'صحيح.' },
        { id: 'c', text: 'float', explanation: 'خطأ.' },
        { id: 'd', text: 'bool', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'input() = نص دائمًا.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'input() يرجع str.', nextStep: 'اختر str.' },
        b: { correct: true, what: 'صحيح', why: 'input() دائمًا str.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'Concept Discovery: Concatenation',
      type: 'multiple-choice',
      goal: 'فهم دمج النصوص بـ+.',
      question: 'ما ناتج "Py" + "thon"؟',
      choices: [
        { id: 'a', text: 'Python', explanation: 'صحيح.' },
        { id: 'b', text: 'Py thon', explanation: 'خطأ: لا تُضاف مسافة.' },
        { id: 'c', text: 'Pyth on', explanation: 'خطأ.' },
        { id: 'd', text: 'TypeError', explanation: 'خطأ: كلاهما str.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '+ بين نصين يلصقهما.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '"Py" + "thon" = "Python".', nextStep: 'اختر Python.' },
        a: { correct: true, what: 'صحيح', why: 'الدمج يلصق النصين.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'Misconception: str + int',
      type: 'bug-hunter',
      goal: 'كشف خطأ دمج str مع int.',
      question: 'أصلح الكود ليطبع "Age: 16":',
      buggyCode: 'age = 16\nprint("Age: " + age)',
      repairedCode: 'age = 16\nprint("Age: " + str(age))',
      expectedOutput: 'Age: 16',
      hints: [{ text: 'لا يمكن دمج str مع int بـ+.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'لا يمكن + بين str و int؛ يجب تحويل age بـstr().', nextStep: 'استخدم str(age).' },
        success: { correct: true, what: 'صحيح', why: 'str(age) يحوّل الرقم إلى نص.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'Predict: تكرار النص',
      type: 'predict-output',
      goal: 'توقع تكرار نص بـ*.',
      question: 'ما ناتج "Hi" * 3؟',
      predictCode: 'print("Hi" * 3)',
      expectedOutput: 'HiHiHi',
      hints: [{ text: '* مع نص يردد النص.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '"Hi" * 3 يردد Hi ثلاث مرات.', nextStep: 'اكتب HiHiHi.' },
        success: { correct: true, what: 'صحيح', why: 'التكرار يلصق النص بنفسه.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: 'Run & Investigate',
      type: 'run-compare',
      goal: 'تشغيل مثال التكرار.',
      question: 'شغّل الكود: print("Go! " * 2)',
      predictCode: 'print("Go! " * 2)',
      expectedOutput: 'Go! Go! ',
      hints: [{ text: 'لاحظ المسافة داخل النص.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '"Go! " يتضمن مسافة في النهاية، وعند التكرار تظهر.', nextStep: 'اكتب Go! Go! ' },
        success: { correct: true, what: 'صحيح', why: 'التكرار يحافظ على المسافات داخل النص.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'Escape Sequences',
      type: 'multiple-choice',
      goal: 'فهم Escape Sequences.',
      question: 'أي الرموز يضيف سطرًا جديدًا داخل النص؟',
      choices: [
        { id: 'a', text: '\\n', explanation: 'صحيح: new line.' },
        { id: 'b', text: '\\t', explanation: 'خطأ: هذا tab.' },
        { id: 'c', text: '\\\\', explanation: 'خطأ: هذا مائلة واحدة.' },
        { id: 'd', text: '\\"', explanation: 'خطأ: هذا علامة تنصيص.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: 'new line = \\n.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '\\n يضيف سطرًا جديدًا.', nextStep: 'اختر \\n.' },
        a: { correct: true, what: 'صحيح', why: '\\n = new line.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'Guided Practice: f-strings',
      type: 'fill-gap',
      goal: 'استخدام f-strings.',
      explanation: 'f"Hello {name}" تضع قيمة المتغير داخل النص.',
      question: 'املأ الفراغات:',
      fillTemplate: 'name = "Sara"\nprint(f"Hello, {___}!")',
      correctFills: { f1: 'name' },
      acceptableFills: { f1: ['name'] },
      expectedOutput: 'Hello, Sara!',
      hints: [{ text: 'ضع اسم المتغير داخل الأقواس المعقوفة.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'f-string تضع المتغير داخل {}.', nextStep: 'اكتب name.' },
        success: { correct: true, what: 'صحيح', why: '{name} تُستبدل بقيمة name.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Fill the Gap: f-string كاملة',
      type: 'fill-gap',
      goal: 'إكمال f-string لإنتاج Output محدد.',
      question: 'املأ ليطبع: My name is Sara and I am 16',
      fillTemplate: 'name = "Sara"\nage = 16\nprint(f"___")',
      correctFills: { f1: 'My name is {name} and I am {age}' },
      acceptableFills: { f1: ['My name is {name} and I am {age}', 'My name is {name} and I am {age}'] },
      expectedOutput: 'My name is Sara and I am 16',
      hints: [{ text: 'استخدم {} حول كل متغير.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'يجب استخدام {name} و {age} داخل f-string.', nextStep: 'اكتب: My name is {name} and I am {age}' },
        success: { correct: true, what: 'صحيح', why: 'f-string دمجت النصوص والمتغيرات.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'sep و end',
      type: 'multiple-choice',
      goal: 'فهم معاملات print.',
      question: 'ما ناتج print("A", "B", sep="-")؟',
      choices: [
        { id: 'a', text: 'A B', explanation: 'خطأ: المسافة الافتراضية تُستبدل بـ-.' },
        { id: 'b', text: 'A-B', explanation: 'صحيح.' },
        { id: 'c', text: 'AB', explanation: 'خطأ.' },
        { id: 'd', text: 'A\\nB', explanation: 'خطأ: هذا لو sep="\\n".' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'sep يتحكم بالفاصل بين القيم.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'sep="-" يضع - بين القيم.', nextStep: 'اختر A-B.' },
        b: { correct: true, what: 'صحيح', why: 'sep يتحكم بالفاصل.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'Bug Hunter: String Errors',
      type: 'bug-hunter',
      goal: 'إصلاح أخطاء تنسيق.',
      question: 'أصلح الكود:',
      buggyCode: 'name = "Sara"\nprint(f"Hello {name")',
      repairedCode: 'name = "Sara"\nprint(f"Hello {name}")',
      expectedOutput: 'Hello Sara',
      hints: [{ text: 'الأقواس المعقوفة يجب أن تُغلق.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'القوس المعقوف لم يُغلق في f-string.', nextStep: 'أغلق {name} بـ}.' },
        success: { correct: true, what: 'صحيح', why: 'f-string مكتوبة بشكل صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'Make Project: Username Generator',
      type: 'mini-project',
      goal: 'مولّد اسم مستخدم ورسالة تحفيزية.',
      explanation: 'استخدم f-string و Escape Sequence واحد على الأقل.',
      question: 'اكتب برنامجك:',
      codeInput: 'name = input("Name: ")\nyear = input("Year: ")\nusername = name + year\nprint(f"Username: {username}")\nprint("Keep coding!\\nYou can do it.")',
      expectedOutput: '',
      hints: [{ text: 'استخدم f-string لطباعة النتيجة.' }, { text: 'استخدم \\n لسطر جديد.' }],
      feedback: {
        default: { correct: false, what: 'المشروع غير مكتمل.', why: 'يجب استخدام f-string واحد على الأقل و Escape Sequence واحد على الأقل بدون TypeError.', nextStep: 'أضف f-string و \\n.' },
        success: { correct: true, what: 'ممتاز!', why: 'استخدمتَ f-string و Escape Sequence بشكل صحيح.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: String Stylist',
      type: 'multiple-choice',
      goal: 'مراجعة النصوص.',
      question: 'ما ناتج print("A" + "B")؟',
      choices: [
        { id: 'a', text: 'AB', explanation: 'صحيح.' },
        { id: 'b', text: 'A B', explanation: 'خطأ.' },
        { id: 'c', text: 'TypeError', explanation: 'خطأ.' },
        { id: 'd', text: 'A+B', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '+ يلصق النصوص.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: '"A" + "B" = "AB".', nextStep: 'اختر AB.' },
        a: { correct: true, what: 'صحيح', why: 'الدمج يلصق النصين.', nextStep: 'التقرير.' }
      }
    }
  ],
  project: {
    title: 'Username & Motivational Message Generator',
    description: 'مولّد يصنع اسم مستخدم من اسم المستخدم وسنة ميلاده (خيالية)، ثم يطبع رسالة تحفيزية منسقة.',
    requirement: 'استخدم f-string واحدًا على الأقل، و Escape Sequence واحدًا على الأقل، بدون TypeError.',
    inputProcessOutput: {
      input: 'name, year',
      process: 'دمج name + year لتكوين username، وطباعة رسالة بـf-string و\\n',
      output: 'username + رسالة تحفيزية منسقة'
    },
    starterCode: '# Username Generator\nname = input("Name: ")\nyear = input("Year: ")\nusername = name + year\n\nprint(f"Username: {username}")\nprint("Keep coding!\\nNever stop learning.")',
    testCases: [
      { id: 't1', inputs: ['Sara', '2008'], expectedOutput: 'Username: Sara2008' },
      { id: 't2', inputs: ['Sara', '2008'], expectedOutput: 'Keep coding!' },
      { id: 't3', inputs: ['Sara', '2008'], expectedOutput: 'Never stop learning.' }
    ],
    successCriteria: [
      'استخدام f-string واحد على الأقل',
      'استخدام Escape Sequence واحد على الأقل',
      'لا TypeError'
    ],
    hints: [
      { text: 'تأكد من تحويل الأرقام إلى نص إذا أردت دمجها بـ+.' },
      { text: 'استخدم \\n للسطر الجديد.' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'Concatenation',
      type: 'multiple-choice',
      question: 'ما ناتج "Py" + "3"؟',
      choices: [
        { id: 'a', text: 'Py3', explanation: 'صحيح.' },
        { id: 'b', text: 'Py 3', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: '+ يلصق.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'يلصق بدون مسافة.', nextStep: 'اختر Py3.' }, a: { correct: true, what: 'صحيح', why: 'Py3.', nextStep: 'التالي.' } }
    },
    {
      id: 'b2',
      title: 'Escape',
      type: 'predict-output',
      question: 'ما ناتج print("A\\nB")؟',
      predictCode: 'print("A\\nB")',
      expectedOutput: 'A\nB',
      hints: [{ text: '\\n = سطر جديد.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '\\n ينقل B لسطر جديد.', nextStep: 'اكتب A ثم B في سطرين.' }, success: { correct: true, what: 'صحيح', why: '\\n = new line.', nextStep: 'التالي.' } }
    },
    {
      id: 'b3',
      title: 'f-string',
      type: 'fill-gap',
      question: 'املأ: x=5; print(f"x = {___}")',
      fillTemplate: 'x = 5\nprint(f"x = {___}")',
      correctFills: { f1: 'x' },
      acceptableFills: { f1: ['x'] },
      expectedOutput: 'x = 5',
      hints: [{ text: 'ضع المتغير داخل {}.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'f-string تحتاج {x}.', nextStep: 'اكتب x.' }, success: { correct: true, what: 'صحيح', why: '{x} = 5.', nextStep: 'التالي.' } }
    },
    {
      id: 'b4',
      title: 'TypeError',
      type: 'bug-hunter',
      question: 'أصلح: print("Age: " + 16)',
      buggyCode: 'print("Age: " + 16)',
      repairedCode: 'print("Age: " + str(16))',
      expectedOutput: 'Age: 16',
      hints: [{ text: 'حوّل الرقم إلى نص.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'لا يمكن + str و int.', nextStep: 'استخدم str(16).' }, success: { correct: true, what: 'صحيح', why: 'str(16) يحل المشكلة.', nextStep: 'التالي.' } }
    },
    {
      id: 'b5',
      title: 'sep',
      type: 'predict-output',
      question: 'ما ناتج print(1, 2, sep=", ")؟',
      predictCode: 'print(1, 2, sep=", ")',
      expectedOutput: '1, 2',
      hints: [{ text: 'sep يفصل بين القيم.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'sep=", " يضع فاصلة ومسافة.', nextStep: 'اكتب 1, 2.' }, success: { correct: true, what: 'صحيح', why: 'sep يتحكم بالفاصل.', nextStep: 'انتهى.' } }
    }
  ]
};

export default session;
