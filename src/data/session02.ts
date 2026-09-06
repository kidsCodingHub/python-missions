import type { Session } from '../types';

const session: Session = {
  id: '02',
  number: 2,
  titleAr: 'المدخلات والمتغيرات والأنواع',
  titleEn: 'Input, Variables & Types',
  badgeName: 'Data Explorer',
  badgeColor: '#0060F0',
  badgeIcon: 'Database',
  description: 'تعلّم كيف تخزّن البيانات في متغيرات، وتأخذ مدخلات من المستخدم، وتفرّق بين الأنواع str/int/float/bool.',
  learningGoals: [
    'أخزّن قيمًا في متغيرات بأسماء واضحة',
    'أستخدم input() لقراءة مدخلات',
    'أفرّق بين الأنواع الأربعة الأساسية',
    'أحوّل بين الأنواع باستخدام int()/float()/str()'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'Recap Arena: print النصي والرقمي',
      type: 'multiple-choice',
      goal: 'مراجعة الفرق بين النصوص والقيم الرقمية داخل print().',
      question: 'ما الفرق بين print("3+2") و print(3+2)؟',
      choices: [
        { id: 'a', text: 'الأول يطبع 3+2 كنص، والثاني يطبع 5 كنتيجة حسابية', explanation: 'صحيح: علامات التنصيص تجعله نصًا.' },
        { id: 'b', text: 'كلاهما يطبع 5', explanation: 'خطأ: النصوص لا تُحسب.' },
        { id: 'c', text: 'كلاهما يطبع 3+2', explanation: 'خطأ: الثاني يُحسب.' },
        { id: 'd', text: 'لا يوجد فرق', explanation: 'خطأ: علامات التنصيص تحدد نوع القيمة.' }
      ],
      correctChoiceIds: ['a'],
      hints: [
        { text: 'ما دام النص داخل علامتي تنصيص، يُطبع كما هو.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'لم تُحدّد الفرق بشكل صحيح.',
          why: 'علامات التنصيص تحوّل المحتوى إلى نص (string) ولا يُحسب.',
          nextStep: 'اختر الخيار الذي يذكر أن الأول يطبع النص كما هو والثاني يحسب النتيجة.'
        },
        a: {
          correct: true,
          what: 'ممتاز!',
          why: '"3+2" نص يُطبع كما هو، أما 3+2 فأرقام تُحسب إلى 5.',
          nextStep: 'انتقل لتصنيف الأنواع.'
        }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'Value Sort: صنّف القيم',
      type: 'category-sort',
      goal: 'تصنيف القيم إلى أنواعها الصحيحة.',
      explanation: 'الأنواع الأساسية: str (نص)، int (عدد صحيح)، float (عدد عشري)، bool (صح/خطأ).',
      categories: ['str', 'int', 'float', 'bool'],
      categoryItems: [
        { id: '1', text: '"Sara"', category: 'str' },
        { id: '2', text: '16', category: 'int' },
        { id: '3', text: '3.5', category: 'float' },
        { id: '4', text: 'True', category: 'bool' },
        { id: '5', text: '"True"', category: 'str' },
        { id: '6', text: '0.0', category: 'float' }
      ],
      hints: [
        { text: 'ما بين علامتي تنصيص دائمًا str.' },
        { text: 'True وFalse دون علامات تنصيص هما bool.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'هناك قيمة في التصنيف الخاطئ.',
          why: 'النصوص بين علامتي تنصيص، الأعداد الصحيحة بدون فاصلة، العشرية بفاصلة، والمنطقية True/False.',
          nextStep: 'راجع كل قيمة وحدّد نوعها حسب الشكل.'
        },
        success: {
          correct: true,
          what: 'تصنيف دقيق!',
          why: 'ميّزتَ بين النصوص والأعداد الصحيحة والعشرية والقيم المنطقية.',
          nextStep: 'انتقل لمعمل المتغيرات.'
        }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'Variable Lab: ما المخزّن؟',
      type: 'value-trace',
      goal: 'ربط اسم المتغير بالقيمة المخزنة.',
      explanation: 'المتغير اسم نعطيه لقيمة لنستخدمها لاحقًا.',
      question: 'ما القيمة التي تُطبع عند تنفيذ الكود؟',
      predictCode: 'name = "Sara"\nage = 16\nprint(name)\nprint(age)',
      traceVariables: [
        { name: 'name', steps: ['"Sara"'], final: 'Sara' },
        { name: 'age', steps: ['16'], final: '16' }
      ],
      expectedOutput: 'Sara\n16',
      hints: [
        { text: 'name يحمل "Sara" و age يحمل 16.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'القيم لا تطابق ما يطبعه الكود.',
          why: 'print(name) يطبع القيمة المخزنة في name، وهي "Sara"، وprint(age) يطبع 16.',
          nextStep: 'اكتب Sara في السطر الأول و16 في السطر الثاني.'
        },
        success: {
          correct: true,
          what: 'ممتاز!',
          why: 'تابعتَ المتغيرات وفهمتَ أن print يعرض القيمة المخزنة.',
          nextStep: 'انتقل لقاعدة "آخر قيمة تفوز".'
        }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'Latest Value Wins',
      type: 'value-trace',
      goal: 'فهم أن آخر قيمة مُسندة للمتغير هي المستخدمة.',
      question: 'ما الذي يطبعه الكود؟',
      predictCode: 'score = 10\nscore = 25\nprint(score)',
      traceVariables: [
        { name: 'score', steps: ['10', '25'], final: '25' }
      ],
      expectedOutput: '25',
      hints: [
        { text: 'المتغير يحمل آخر قيمة أُسندت له.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'التوقع غير صحيح.',
          why: 'عندما نسند قيمة جديدة لنفس المتغير، القيمة القديمة تُستبدل.',
          nextStep: 'اكتب 25 فقط.'
        },
        success: {
          correct: true,
          what: 'صحيح!',
          why: 'score أخذت 10 ثم أُعيد تعيينها إلى 25، لذا تُطبع 25.',
          nextStep: 'انتقل لفحص أسماء المتغيرات.'
        }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: 'Name Detective: أسماء المتغيرات',
      type: 'true-false-fix',
      goal: 'تمييز أسماء متغيرات صحيحة من خاطئة.',
      explanation: 'اسم المتغير لا يبدأ برقم، ولا يحتوي على مسافة، ولا يساوي كلمة محجوزة.',
      question: 'حدّد الأسماء الصحيحة وصحّح الخاطئة:',
      choices: [
        { id: 'a', text: 'student_name', correct: true, explanation: 'صحيح: يمكن استخدام _.' },
        { id: 'b', text: '2age', correct: false, explanation: 'خطأ: لا يبدأ برقم.' },
        { id: 'c', text: 'student name', correct: false, explanation: 'خطأ: يحتوي على مسافة.' },
        { id: 'd', text: 'age', correct: true, explanation: 'صحيح.' }
      ],
      correctChoiceIds: ['a', 'd'],
      hints: [
        { text: 'الأرقام في البداية ممنوعة.' },
        { text: 'المسافات ممنوعة داخل الاسم.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الاختيار غير صحيح.',
          why: 'اسم المتغير يجب ألا يبدأ برقم ولا يحتوي على مسافة.',
          nextStep: 'اختر الأسماء التي تتبع القواعد.'
        },
        success: {
          correct: true,
          what: 'ممتاز!',
          why: 'student_name و age أسماء صحيحة، بينما 2age و student name مخالفان للقواعد.',
          nextStep: 'انتقل لمحاكاة input().'
        }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'Input Mission: محاكاة input()',
      type: 'input-simulator',
      goal: 'محاكاة قراءة مدخل وطباعته.',
      explanation: 'input("رسالة") تظهر رسالة وتنتظر من المستخدم كتابة نص.',
      question: 'إذا كتب المستخدم "Ali" عند المطالبة، ما الـOutput؟',
      inputSimulations: [
        { code: 'name = input("Your name: ")\nprint(name)', inputs: ['Ali'], expected: 'Ali' }
      ],
      expectedOutput: 'Ali',
      hints: [
        { text: 'المتغير name يحمل ما كتبه المستخدم.' },
        { text: 'print(name) يطبع القيمة المدخلة.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الناتج المتوقع غير صحيح.',
          why: 'input() يخزّن النص المدخل في name، ثم print(name) يطبعه.',
          nextStep: 'اكتب Ali فقط.'
        },
        success: {
          correct: true,
          what: 'محاكاة صحيحة!',
          why: 'name = "Ali" ثم print(name) يطبع Ali.',
          nextStep: 'انتقل لفحص نوع type().'
        }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'Type Scanner: توقع type()',
      type: 'multiple-choice',
      goal: 'توقع نوع القيم باستخدام type().',
      question: 'ما ناتج type(3.14)؟',
      choices: [
        { id: 'a', text: '<class \'int\'>', explanation: 'خطأ: 3.14 ليس عددًا صحيحًا.' },
        { id: 'b', text: '<class \'float\'>', explanation: 'صحيح: الأرقام العشرية float.' },
        { id: 'c', text: '<class \'str\'>', explanation: 'خطأ: 3.14 ليس نصًا.' },
        { id: 'd', text: '<class \'bool\'>', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [
        { text: 'الأرقام ذات الفاصلة العشرية تُسمى float.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'نوع غير صحيح.',
          why: '3.14 عدد عشري، لذا type() يرجع float.',
          nextStep: 'اختر <class \'float\'>.'
        },
        b: {
          correct: true,
          what: 'صحيح!',
          why: '3.14 من نوع float لأنه يحتوي على فاصلة عشرية.',
          nextStep: 'انتقل لفخ input().'
        }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Input Trap: فخ الأرقام في input()',
      type: 'multiple-choice',
      goal: 'توضيح أن input() يعيد دائمًا نصًا.',
      question: 'إذا كتب المستخدم 16 في age = input("Age: ")، فما نوع age؟',
      choices: [
        { id: 'a', text: 'int', explanation: 'خطأ: input() لا يحوّل تلقائيًا.' },
        { id: 'b', text: 'str', explanation: 'صحيح: كل مدخل من input() يكون نصًا.' },
        { id: 'c', text: 'float', explanation: 'خطأ.' },
        { id: 'd', text: 'bool', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [
        { text: 'input() تعيد ما كتبه المستخدم كنص حتى لو كان أرقامًا.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'التصنيف غير صحيح.',
          why: 'input() دائمًا تُعيد str؛ إن أردت رقمًا يجب تحويله بـint() أو float().',
          nextStep: 'اختر str.'
        },
        b: {
          correct: true,
          what: 'ممتاز!',
          why: 'input() ترجع النص "16" وليس الرقم 16.',
          nextStep: 'انتقل لمعمل التحويل.'
        }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'Conversion Lab: تحويل الأنواع',
      type: 'fill-gap',
      goal: 'التدرب على int(), float(), str().',
      explanation: 'نحوّل النص إلى رقم للحساب، أو الرقم إلى نص للدمج.',
      question: 'املأ الفراغات لحساب العمر بالأشهر:',
      fillTemplate: 'age = input("Age: ")\nage_num = ____(age)\nmonths = age_num * 12\nprint(____)',
      correctFills: { f1: 'int', f2: 'months' },
      acceptableFills: { f1: ['int'], f2: ['months'] },
      expectedOutput: '',
      hints: [
        { text: 'لتحويل النص إلى عدد صحيح نستخدم int().' },
        { text: 'نريد طباعة قيمة months.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الفراغات غير صحيحة.',
          why: 'input() يرجع نصًا، لذا نحوّله بـint() قبل الضرب، ثم نطبع النتيجة.',
          nextStep: 'اكتب int في الفراغ الأول وmonths في الثاني.'
        },
        success: {
          correct: true,
          what: 'إجابة صحيحة!',
          why: 'int(age) يحوّل النص إلى رقم، ثم print(months) يطبع النتيجة.',
          nextStep: 'انتقل لصيّاد الأخطاء.'
        }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'Bug Hunter: أخطاء Variables & Input',
      type: 'bug-hunter',
      goal: 'إصلاح أخطاء متغيرات و input.',
      question: 'أصلح الكود ليعمل بدون أخطاء:',
      buggyCode: 'Age = input("Age: ")\nprint(age + 1)',
      repairedCode: 'age = int(input("Age: "))\nprint(age + 1)',
      expectedOutput: '',
      hints: [
        { text: 'Python تفرّق بين الحروف الكبيرة والصغيرة.' },
        { text: 'لا يمكن جمع نص مع رقم.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الإصلاح غير كامل.',
          why: 'Age و age متغيران مختلفان في Python، وinput() يرجع نصًا لا يمكن جمعه على رقم.',
          nextStep: 'استخدم age بحرف صغير في كل مكان وحوّل المدخل بـint().'
        },
        success: {
          correct: true,
          what: 'إصلاح ممتاز!',
          why: 'توحيد الاسم وحفظ الحالة الصغيرة، مع تحويل المدخل إلى int قبل الجمع.',
          nextStep: 'انتقل لمشروع البطاقة التفاعلية.'
        }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'Make Project: Smart Profile',
      type: 'mini-project',
      goal: 'بناء بطاقة بيانات تفاعلية باستخدام input و print.',
      explanation: 'استخدم 3 مدخلات على الأقل مع اسم واضح لكل متغير.',
      question: 'اكتب برنامجك هنا:',
      codeInput: 'name = input("Name: ")\nage = int(input("Age: "))\nmonths = age * 12\nprint(name, "عمره بالأشهر:", months)',
      expectedOutput: '',
      hints: [
        { text: 'استخدم input() لقراءة name و age.' },
        { text: 'حوّل age إلى int قبل الحساب.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'المشروع لا يستوفي المعايير بعد.',
          why: 'يجب استخدام 3 مدخلات على الأقل مع أسماء واضحة وتحويل نوع واحد على الأقل.',
          nextStep: 'أضف مدخلات name و age و dream على الأقل، وحوّل age إلى int.'
        },
        success: {
          correct: true,
          what: 'مشروع ممتاز!',
          why: 'استخدمتَ المتغيرات والمدخلات والتحويل لبناء بطاقة ذكية.',
          nextStep: 'انتقل للـBoss Challenge.'
        }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: Data Explorer',
      type: 'multiple-choice',
      goal: 'جولة نهائية مختلطة.',
      question: 'ما النوع الصحيح للقيمة التي تُعيدها input()؟',
      choices: [
        { id: 'a', text: 'int', explanation: 'خطأ.' },
        { id: 'b', text: 'str', explanation: 'صحيح.' },
        { id: 'c', text: 'float', explanation: 'خطأ.' },
        { id: 'd', text: 'bool', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'input() = نص دائمًا.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'input() تعيد str دائمًا.', nextStep: 'اختر str.' },
        b: { correct: true, what: 'صحيح', why: 'input() تعيد نصًا.', nextStep: 'التقرير.' }
      }
    }
  ],
  project: {
    title: 'Interactive Profile Card',
    description: 'بطاقة بيانات تفاعلية تحسب العمر التقريبي بالأشهر باستخدام input() والمتغيرات.',
    requirement: 'استخدم 3 مدخلات على الأقل بأسماء واضحة، مع تحويل نوع واحد على الأقل بشكل صحيح.',
    inputProcessOutput: {
      input: 'name, age, dream (أو أي مدخلات تختارها)',
      process: 'تخزين المدخلات في متغيرات، تحويل age إلى int، حساب months = age * 12',
      output: 'بطاقة بيانات منظمة'
    },
    starterCode: '# Interactive Profile Card\nname = input("Name: ")\nage = int(input("Age: "))\ndream = input("Dream: ")\nmonths = age * 12\nprint("Name:", name)\nprint("Age:", age)\nprint("Dream:", dream)\nprint("Age in months:", months)',
    testCases: [
      { id: 't1', inputs: ['Sara', '16', 'Doctor'], expectedOutput: 'Name: Sara' },
      { id: 't2', inputs: ['Sara', '16', 'Doctor'], expectedOutput: 'Age: 16' },
      { id: 't3', inputs: ['Sara', '16', 'Doctor'], expectedOutput: 'Dream: Doctor' },
      { id: 't4', inputs: ['Sara', '16', 'Doctor'], expectedOutput: 'Age in months: 192' }
    ],
    successCriteria: [
      '3 مدخلات على الأقل',
      'تحويل نوع واحد على الأقل',
      'طباعة منظمة لكل المدخلات والنتيجة'
    ],
    hints: [
      { text: 'استخدم int() لحساب العمر بالأشهر.' },
      { text: 'تأكد من عدم وجود Syntax Error في print().' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'الأنواع',
      type: 'multiple-choice',
      question: 'ما نوع القيمة 3.14؟',
      choices: [
        { id: 'a', text: 'int', explanation: 'خطأ.' },
        { id: 'b', text: 'float', explanation: 'صحيح.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'الأرقام العشرية float.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: '3.14 float.', nextStep: 'اختر float.' }, b: { correct: true, what: 'صحيح', why: 'float للأرقام العشرية.', nextStep: 'التالي.' } }
    },
    {
      id: 'b2',
      title: 'input()',
      type: 'predict-output',
      question: 'إذا أدخل المستخدم 20، ما نوع x في x = input("Age: ")؟',
      predictCode: 'x = input("Age: ")',
      expectedOutput: 'str',
      hints: [{ text: 'input() دائمًا str.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'input() يرجع str.', nextStep: 'اكتب str.' }, success: { correct: true, what: 'صحيح', why: 'input() = str دائمًا.', nextStep: 'التالي.' } }
    },
    {
      id: 'b3',
      title: 'اسم المتغير',
      type: 'multiple-choice',
      question: 'أي اسم متغير صحيح؟',
      choices: [
        { id: 'a', text: '2name', explanation: 'خطأ: يبدأ برقم.' },
        { id: 'b', text: 'student_name', explanation: 'صحيح.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'لا يبدأ الاسم برقم.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'لا يبدأ الاسم برقم.', nextStep: 'اختر student_name.' }, b: { correct: true, what: 'صحيح', why: 'student_name يتبع القواعد.', nextStep: 'التالي.' } }
    },
    {
      id: 'b4',
      title: 'أصلح',
      type: 'bug-hunter',
      question: 'أصلح: print(name + 5) حيث name = "Ali"',
      buggyCode: 'name = "Ali"\nprint(name + 5)',
      repairedCode: 'name = "Ali"\nprint(name, 5)',
      expectedOutput: 'Ali 5',
      hints: [{ text: 'لا يمكن دمج str مع int بـ+.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'لا يمكن جمع نص ورقم بـ+.', nextStep: 'استخدم فاصلة print(name, 5).' }, success: { correct: true, what: 'صحيح', why: 'الفاصلة تطبع القيمتين.', nextStep: 'التالي.' } }
    },
    {
      id: 'b5',
      title: 'type()',
      type: 'multiple-choice',
      question: 'ما ناتج type(True)؟',
      choices: [
        { id: 'a', text: 'bool', explanation: 'صحيح.' },
        { id: 'b', text: 'str', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: 'True/False نوعهما bool.' }],
      feedback: { default: { correct: false, what: 'خطأ', why: 'True bool.', nextStep: 'اختر bool.' }, a: { correct: true, what: 'صحيح', why: 'True من نوع bool.', nextStep: 'انتهى.' } }
    }
  ]
};

export default session;
