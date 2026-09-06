import type { Session } from '../types';

const session: Session = {
  id: '01',
  number: 1,
  titleAr: 'مرحبًا بك في Python',
  titleEn: 'Welcome to Python',
  badgeName: 'Code Starter',
  badgeColor: '#27C93F',
  badgeIcon: 'Rocket',
  description: 'أولى خطواتك في عالم البرمجة: ماذا يعني Algorithm وProgram وInterpreter، وكيف تكتب أول سطر كود باستخدام print().',
  learningGoals: [
    'أفرّق بين Algorithm وCode وProgram',
    'أكتب أول برنامج باستخدام print() بدون Syntax Error',
    'أحدّد خطأ Syntax واحدًا وأصلحه',
    'أبني بطاقة اسم رقمية (Digital Name Badge)'
  ],
  missions: [
    {
      id: 'm01',
      order: 1,
      title: 'ما هو البرنامج؟',
      type: 'multiple-choice',
      goal: 'تعريف Program بأنه مجموعة أوامر يتبعها الحاسوب لإنجاز مهمة.',
      question: 'أيُّ التعريفات التالية يصف "Program" بأفضل شكل؟',
      choices: [
        { id: 'a', text: 'قائمة بالأوامر يتبعها الحاسوب لإنجاز مهمة محددة', explanation: 'هذا التعريف الأساسي للبرنامج.' },
        { id: 'b', text: 'قطعة معدنية داخل الحاسوب', explanation: 'هذا يصف Hardware، وليس البرنامج.' },
        { id: 'c', text: 'لغة يتحدث بها المبرمج فقط دون فهمها للحاسوب', explanation: 'الحاسوب يفهم البرنامج عبر الـInterpreter.' },
        { id: 'd', text: 'ملف صور فقط', explanation: 'البرامج ليست صورًا.' }
      ],
      correctChoiceIds: ['a'],
      hints: [
        { text: 'فكّر فيما يحدث عندما تضغط زر التشغيل في تطبيق.' },
        { text: 'البرنامج يحتوي على خطوات مرتبة.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'اخترتَ تعريفًا لا يصف البرنامج.',
          why: 'البرنامج (Program) هو مجموعة من التعليمات التي يتبعها الحاسوب لأداء مهمة.',
          nextStep: 'أعد القراءة وأختر التعريف الذي يتحدث عن "أوامر" و"مهمة".'
        },
        a: {
          correct: true,
          what: 'إجابة صحيحة!',
          why: 'البرنامج فعلًا قائمة أوامر يتبعها الحاسوب خطوة بخطوة.',
          nextStep: 'انتقل للمهمة التالية لتشغيل أول سطر كود.'
        }
      }
    },
    {
      id: 'm02',
      order: 2,
      title: 'أول print() لك',
      type: 'guided-practice',
      goal: 'كتابة أول برنامج Python باستخدام print().',
      explanation: 'دالة print() تطبع النص الذي تضعه بين الأقواس داخل علامتي تنصيص.',
      example: { code: 'print("Hello, Python!")', output: 'Hello, Python!' },
      question: 'اكتب سطرًا واحدًا يطبع النص الترحيبي التالي بالضبط:\nمرحبًا بك في عالم Python!',
      codeInput: '',
      expectedOutput: 'مرحبًا بك في عالم Python!',
      hints: [
        { text: 'استخدم print() ثم ضع النص بين علامتي تنصيص مزدوجتين.' },
        { text: 'الشكل: print("...")' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الكود لا يطبع الناتج المطلوب بالضبط.',
          why: 'ربما نسيتَ print أو علامات التنصيص، أو غيّرتَ النص.',
          nextStep: 'اكتب print("مرحبًا بك في عالم Python!") ثم تحقق.'
        },
        success: {
          correct: true,
          what: 'رائع! كتبتَ أول برنامج Python.',
          why: 'دالة print() طبعت النص بالضبط كما هو بين علامتي التنصيص.',
          nextStep: 'انتقل للمهمة التالية لترتيب خطوات Algorithm.'
        }
      }
    },
    {
      id: 'm03',
      order: 3,
      title: 'رتّب خطوات Algorithm',
      type: 'sequence-builder',
      goal: 'ترتيب 5 خطوات لتكوين Algorithm واضح.',
      explanation: 'Algorithm هو خطوات مرتبة لحل مشكلة.',
      question: 'رتّب خطوات تحضير كوب شاي بالترتيب الصحيح:',
      sequenceItems: [
        'سخّن الماء',
        'ضع كيس الشاي في الكوب',
        'اسكب الماء الساخن',
        'اتركه لمدة دقيقتين',
        'أضف السكر حسب الرغبة'
      ],
      correctSequence: [
        'سخّن الماء',
        'ضع كيس الشاي في الكوب',
        'اسكب الماء الساخن',
        'اتركه لمدة دقيقتين',
        'أضف السكر حسب الرغبة'
      ],
      hints: [
        { text: 'لا يمكن سكب الماء قبل تسخينه.' },
        { text: 'لا يمكن إضافة السكر قبل وجود الشاي في الكوب.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الترتيب لا يزال غير صحيح.',
          why: 'Algorithm يحتاج خطوات منطقية متتابعة؛ بعض الخطوات تعتمد على ما قبلها.',
          nextStep: 'اسأل نفسك: أي خطوة يجب أن تكون أولًا؟ ثم أي خطوة تليها مباشرة؟'
        },
        success: {
          correct: true,
          what: 'ترتيب ممتاز!',
          why: 'كل خطوة تمهد للخطوة التالية، وهذا جوهر Algorithm الجيد.',
          nextStep: 'انتقل لتصنيف المفاهيم.'
        }
      }
    },
    {
      id: 'm04',
      order: 4,
      title: 'صنّف: Algorithm / Code / Program',
      type: 'category-sort',
      goal: 'التفرقة بين Algorithm وCode وProgram.',
      explanation: 'Algorithm: خطوات بلغة بشرية. Code: أوامر بلغة برمجة. Program: ملف قابل للتشغيل.',
      categories: ['Algorithm', 'Code', 'Program'],
      categoryItems: [
        { id: '1', text: 'خطوات وصفية لحساب المجموع', category: 'Algorithm' },
        { id: '2', text: 'total = 10 + 20', category: 'Code' },
        { id: '3', text: 'تطبيق حاسبة يعمل على الجوال', category: 'Program' },
        { id: '4', text: 'ارسم دائرة ثم املأها باللون الأحمر', category: 'Algorithm' },
        { id: '5', text: 'print("Welcome")', category: 'Code' },
        { id: '6', text: 'لعبة تفاعلية يمكن تشغيلها', category: 'Program' }
      ],
      hints: [
        { text: 'Algorithm غالبًا بلغة عادية، Code بلغة Python.' },
        { text: 'Program هو النتيجة النهائية التي يستخدمها المستخدم.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'هناك عنصر واحد على الأقل في التصنيف الخاطئ.',
          why: 'Algorithm خطوات بشرية، Code أوامر Python، Program منتج قابل للتشغيل.',
          nextStep: 'راجع كل عنصر واسأل: هل هو وصف، أم أمر Python، أم منتج كامل؟'
        },
        success: {
          correct: true,
          what: 'تصنيف صحيح بالكامل!',
          why: 'فرّقتَ بين الوصف البشري والأمر البرمجي والمنتج النهائي.',
          nextStep: 'انتقل لفهم دور الـInterpreter.'
        }
      }
    },
    {
      id: 'm05',
      order: 5,
      title: 'دور الـInterpreter',
      type: 'concept',
      goal: 'فهم أن Interpreter يقرأ الكود سطرًا بسطر وينفذه.',
      explanation: 'Python Interpreter هو البرنامج الذي يقرأ كود Python ويترجمه إلى تعليمات يفهمها الحاسوب.',
      example: { code: 'print("A")\nprint("B")', output: 'A\nB', note: 'ينفذ السطر الأول ثم السطر الثاني.' },
      question: 'ما هو دور Python Interpreter؟',
      choices: [
        { id: 'a', text: 'يقرأ الكود سطرًا بسطر وينفذه', explanation: 'هذا هو التعريف الصحيح.' },
        { id: 'b', text: 'يرسم الرسومات فقط', explanation: 'Interpreter لا يرسم تلقائيًا.' },
        { id: 'c', text: 'يحذف الأخطاء تلقائيًا', explanation: 'Interpreter يكشف الأخطاء لا يحذفها.' },
        { id: 'd', text: 'يصمم واجهات المستخدم', explanation: 'ليس هذا دوره الأساسي.' }
      ],
      correctChoiceIds: ['a'],
      hints: [
        { text: 'عندما تضغط Run، من ينفذ الكود؟' },
        { text: 'الترجمة تتم سطرًا بسطر في Python.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'لم تختر الوصف الصحيح للـInterpreter.',
          why: 'Interpreter يقرأ الكود وينفذه خطوة بخطوة؛ هو الجسر بين كودك والحاسوب.',
          nextStep: 'اختر الخيار الذي يتحدث عن القراءة والتنفيذ السطري.'
        },
        a: {
          correct: true,
          what: 'صحيح!',
          why: 'Python Interpreter يقرأ الكود من أعلى إلى أسفل وينفذ كل سطر.',
          nextStep: 'انتقل لتوقع ناتج عدة أوامر print().'
        }
      }
    },
    {
      id: 'm06',
      order: 6,
      title: 'توقع الناتج (Predict)',
      type: 'predict-output',
      goal: 'التنبؤ بـOutput عدة أوامر print() قبل تشغيلها.',
      primmTag: 'Predict',
      explanation: 'اقرأ الكود بتركيز وتخيّل ما ستطبعه كل دالة print().',
      predictCode: 'print("One")\nprint("Two")\nprint("Three")',
      question: 'ما الـOutput المتوقع لهذا الكود؟',
      expectedOutput: 'One\nTwo\nThree',
      hints: [
        { text: 'كل print() تطبع سطرًا منفصلًا.' },
        { text: 'الترتيب من أعلى إلى أسفل.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'التوقع لا يطابق ما يطبعه الكود.',
          why: 'كل دالة print() تطبع سطرًا جديدًا، والتنفيذ يتم من الأعلى للأسفل.',
          nextStep: 'اكتب النصوص الثلاثة كل واحد في سطر منفصل بالترتيب.'
        },
        success: {
          correct: true,
          what: 'توقع دقيق!',
          why: 'تابعتَ التنفيذ سطرًا بسطر وعلمتَ أن كل print() في سطر مستقل.',
          nextStep: 'انتقل لتشغيل الكود ومقارنته بالتوقع.'
        }
      }
    },
    {
      id: 'm07',
      order: 7,
      title: 'شغّل وقارن (Run & Investigate)',
      type: 'run-compare',
      goal: 'كتابة الـOutput المتوقع ثم مقارنته بالنتيجة.',
      explanation: 'اكتب التوقع، ثم اضغط "تشغيل" لترى الناتج الحقيقي.',
      predictCode: 'print("Line 1")\nprint("Line 2")',
      question: 'اكتب الناتج المتوقع، ثم شغّل الكود للتأكد.',
      expectedOutput: 'Line 1\nLine 2',
      hints: [
        { text: 'تذكر: كل print() سطر جديد.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'التوقع لا يطابق الناتج الفعلي.',
          why: 'Python ينفذ السطور بالترتيب ويطبع كل سطر في سطر منفصل.',
          nextStep: 'اكتب "Line 1" في أول سطر و"Line 2" في ثاني سطر.'
        },
        success: {
          correct: true,
          what: 'مطابقة تامة!',
          why: 'توقعك يطابق تنفيذ Python الفعلي.',
          nextStep: 'انتقل لمهمة الخلط بين Syntax Error وSemantics.'
        }
      }
    },
    {
      id: 'm08',
      order: 8,
      title: 'Syntax Error أم Semantics؟',
      type: 'multiple-choice',
      goal: 'التفرقة بين خطأ الكتابة (Syntax) والمعنى/المنطق (Semantics).',
      explanation: 'Syntax Error: كتابة خاطئة (مثل قوس ناقص). Semantics: المنطق خاطئ لكن الكود يعمل (مثل جمع رقمين لا يجب جمعهما).',
      question: 'الكود التالي يعمل لكنه يطبع "15" بدلًا من المطلوب. أي نوع من الأخطاء هذا؟\ncode: print(5 + 10)  # المطلوب كان 5 × 10',
      choices: [
        { id: 'a', text: 'Syntax Error', explanation: 'الكود يعمل، إذن ليس Syntax Error.' },
        { id: 'b', text: 'Semantics Error', explanation: 'المنطق/المعنى خاطئ: استخدمت + بدل ×.' },
        { id: 'c', text: 'لا يوجد خطأ', explanation: 'هناك خطأ في المنطق.' },
        { id: 'd', text: 'Interpreter Error', explanation: 'المفسر لا يرى خطأ هنا.' }
      ],
      correctChoiceIds: ['b'],
      hints: [
        { text: 'هل الكود يعمل أم يرفض التشغيل؟' },
        { text: 'إذا عمل الكود لكن النتيجة غير المطلوبة، فالمشكلة في Semantics.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'التصنيف غير صحيح.',
          why: 'Syntax Error يمنع التشغيل، أما Semantics فالكود يعمل لكن النتيجة غير مقصودة.',
          nextStep: 'اختر الخيار الذي يعني "خطأ في المنطق أو المعنى".'
        },
        b: {
          correct: true,
          what: 'صحيح تمامًا!',
          why: 'الكود مكتوب صحيحًا من حيث القواعد (Syntax) لكن العملية الحسابية غير المقصودة.',
          nextStep: 'انتقل لإصلاح أكواد print() المكسورة.'
        }
      }
    },
    {
      id: 'm09',
      order: 9,
      title: 'صيّد الأخطاء: Bug Hunter',
      type: 'bug-hunter',
      goal: 'إصلاح 3 أكواد print() مكسورة.',
      explanation: 'ابحث عن القوس المفقود أو علامة التنصيص الناقصة أو الخطأ الإملائي في الأمر.',
      question: 'أصلح الأخطاء في الكود التالي ليطبع بالشكل المطلوب:\nمرحبًا\nPython',
      buggyCode: 'print("مرحبًا)\nprint(Python)',
      repairedCode: 'print("مرحبًا")\nprint("Python")',
      expectedOutput: 'مرحبًا\nPython',
      hints: [
        { text: 'كل نص يجب أن يبدأ وينتهي بعلامة تنصيص.' },
        { text: 'كل print() يجب أن يفتح ويغلق بقوسين.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'لا يزال هناك خطأ في الكود المُصلح.',
          why: 'ربما نسيتَ إغلاق علامة التنصيص أو أغفلتَ علامات التنصيص حول Python.',
          nextStep: 'اكتب الكود على سطرين: print("مرحبًا") ثم print("Python").'
        },
        success: {
          correct: true,
          what: 'أصلحتَ الأخطاء بنجاح!',
          why: 'أغلقتَ علامة التنصيص الأولى وأضفتَ علامتي تنصيص حول Python.',
          nextStep: 'انتقل لترتيب قطع كود print().'
        }
      }
    },
    {
      id: 'm10',
      order: 10,
      title: 'بناء سطر print() من قطع',
      type: 'code-blocks',
      goal: 'تكوين سطر print() صحيح من القطع الجاهزة.',
      explanation: 'رتّب القطع لتكوين سطر print() واحد صحيح.',
      question: 'رتّب القطع لتطبع رسالة ترحيب:',
      codeBlocks: [
        { id: 'print', text: 'print' },
        { id: 'open', text: '(' },
        { id: 'quote1', text: '"' },
        { id: 'text', text: 'Welcome to Python' },
        { id: 'quote2', text: '"' },
        { id: 'close', text: ')' }
      ],
      correctBlockOrder: ['print', 'open', 'quote1', 'text', 'quote2', 'close'],
      hints: [
        { text: 'ابدأ باسم الدالة print.' },
        { text: 'الترتيب: print("النص")' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'الترتيب لا يكوّن سطر Python صحيح.',
          why: 'سطر print() يتبع الشكل: print("النص") بترتيب محدد.',
          nextStep: 'رتّب القطع: print ثم ( ثم " ثم النص ثم " ثم ).'
        },
        success: {
          correct: true,
          what: 'ترتيب ممتاز!',
          why: 'أكملتَ بناء السطر بشكل صحيح: print("Welcome to Python").',
          nextStep: 'انتقل لمشروع البطاقة الرقمية.'
        }
      }
    },
    {
      id: 'm11',
      order: 11,
      title: 'مشروع: Digital Name Badge',
      type: 'mini-project',
      goal: 'بناء بطاقة رقمية تطبع الاسم والهدف ورسالة ترحيب.',
      explanation: 'استخدم print() فقط لطباعة 3 أسطر على الأقل.',
      question: 'اكتب برنامجك هنا:',
      codeInput: 'print("اسمي: ...")\nprint("هدفي من تعلم البرمجة: ...")\nprint("رسالة ترحيب: ...")',
      expectedOutput: '',
      hints: [
        { text: 'استخدم 3 أوامر print() على الأقل.' },
        { text: 'تأكد من وجود اسمك وهدفك ورسالة ترحيب.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'المشروع لا يستوفي المعايير بعد.',
          why: 'يجب أن يحتوي الكود على 3 أسطر print() على الأقل: الاسم والهدف ورسالة ترحيب.',
          nextStep: 'أضف أو عدّل الأسطر لتطبع المعلومات الثلاث بوضوح.'
        },
        success: {
          correct: true,
          what: 'مشروع رائع!',
          why: 'استخدمتَ print() لبناء بطاقة رقمية كاملة.',
          nextStep: 'انتقل للتحدي النهائي Boss Challenge.'
        }
      }
    },
    {
      id: 'm12',
      order: 12,
      title: 'Boss Challenge: Code Starter',
      type: 'multiple-choice',
      goal: 'جولة نهائية مختلطة لمراجعة الحصة.',
      question: 'أيُّ السطور التالية يحتوي على Syntax Error؟',
      choices: [
        { id: 'a', text: 'print("Hello")', explanation: 'صحيح.' },
        { id: 'b', text: 'print("Hello)', explanation: 'علامة التنصيص الثانية مفقودة.' },
        { id: 'c', text: 'print("Hello")', explanation: 'صحيح (مكرر للتأكد).' },
        { id: 'd', text: 'print Hello', explanation: 'مفقود الأقواس لكن السؤال يطلب أول خطأ واضح.' }
      ],
      correctChoiceIds: ['b'],
      hints: [
        { text: 'ابحث عن علامة تنصيص لم تُغلق.' }
      ],
      feedback: {
        default: {
          correct: false,
          what: 'لم تحدد السطر الخاطئ.',
          why: 'Syntax Error هنا ناتج عن علامة تنصيص مفقودة في السطر الثاني.',
          nextStep: 'اختر السطر الذي يفتقر إلى علامة التنصيص المغلقة.'
        },
        b: {
          correct: true,
          what: 'أحسنت! اجتزتَ Boss Challenge.',
          why: 'السطر print("Hello) يفتقر إلى علامة التنصيص المغلقة.',
          nextStep: 'انتقل للتقرير النهائي.'
        }
      }
    }
  ],
  project: {
    title: 'Digital Name Badge',
    description: 'بطاقة اسم رقمية تطبع اسمك المختصر، هدفك من تعلم البرمجة، ورسالة ترحيب.',
    requirement: 'استخدم print() فقط لطباعة 3 أسطر على الأقل: الاسم، الهدف، رسالة ترحيب.',
    inputProcessOutput: {
      input: 'لا يوجد (البيانات مكتوبة مباشرة في الكود)',
      process: 'طباعة الأسطر باستخدام print()',
      output: '3 أسطر نصية منسقة'
    },
    starterCode: 'print("الاسم: Ahmed")\nprint("هدفي: بناء تطبيقات مفيدة")\nprint("مرحبًا بكم في رحلتي مع Python!")',
    testCases: [
      { id: 't1', expectedOutput: 'الاسم:', description: 'يظهر الاسم' },
      { id: 't2', expectedOutput: 'هدفي:', description: 'يظهر الهدف' },
      { id: 't3', expectedOutput: 'مرحبًا', description: 'تظهر رسالة ترحيب' }
    ],
    successCriteria: [
      'الكود يعمل بدون Syntax Error',
      'يطبع 3 أسطر على الأقل',
      'كل سطر يحتوي على معلومة واضحة'
    ],
    hints: [
      { text: 'استبدل "Ahmed" باسمك المختصر.' },
      { text: 'تأكد من إغلاق كل علامتي تنصيص وأقواس.' }
    ]
  },
  bossRounds: [
    {
      id: 'b1',
      title: 'ما البرنامج؟',
      type: 'multiple-choice',
      question: 'أفضل تعريف لـ Program هو:',
      choices: [
        { id: 'a', text: 'أوامر يتبعها الحاسوب لإنجاز مهمة', explanation: 'صحيح.' },
        { id: 'b', text: 'قطعة Hardware', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: 'Program = أوامر + هدف.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'Program هو مجموعة أوامر.', nextStep: 'اختر التعريف الأول.' },
        a: { correct: true, what: 'صحيح', why: 'Program مجموعة أوامر.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'b2',
      title: 'توقع الناتج',
      type: 'predict-output',
      question: 'ما ناتج الكود؟ print("X")\nprint("Y")',
      predictCode: 'print("X")\nprint("Y")',
      expectedOutput: 'X\nY',
      hints: [{ text: 'كل print() سطر جديد.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'كل print() في سطر منفصل.', nextStep: 'اكتب X ثم Y في سطرين.' },
        success: { correct: true, what: 'صحيح', why: 'التنفيذ من الأعلى للأسفل.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'b3',
      title: 'صنّف المفهوم',
      type: 'multiple-choice',
      question: 'خطوات وصفية لحل مشكلة تُسمى:',
      choices: [
        { id: 'a', text: 'Algorithm', explanation: 'صحيح.' },
        { id: 'b', text: 'Program', explanation: 'خطأ.' }
      ],
      correctChoiceIds: ['a'],
      hints: [{ text: 'Algorithm = خطوات بشرية.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'Algorithm هي الخطوات الوصفية.', nextStep: 'اختر Algorithm.' },
        a: { correct: true, what: 'صحيح', why: 'Algorithm خطوات وصفية.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'b4',
      title: 'أصلح الكود',
      type: 'bug-hunter',
      question: 'أصلح السطر ليطبع Hello:',
      buggyCode: 'print(Hello)',
      repairedCode: 'print("Hello")',
      expectedOutput: 'Hello',
      hints: [{ text: 'Hello نص يحتاج علامتي تنصيص.' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'النص يجب أن يكون بين علامتي تنصيص.', nextStep: 'اكتب print("Hello").' },
        success: { correct: true, what: 'صحيح', why: 'أضفتَ علامتي التنصيص.', nextStep: 'التالي.' }
      }
    },
    {
      id: 'b5',
      title: 'Syntax vs Semantics',
      type: 'multiple-choice',
      question: 'إذا عمل الكود لكن النتيجة غير المطلوبة، فالخطأ هو:',
      choices: [
        { id: 'a', text: 'Syntax Error', explanation: 'خطأ: لو كان Syntax Error لما عمل.' },
        { id: 'b', text: 'Semantics Error', explanation: 'صحيح: المنطق خاطئ.' }
      ],
      correctChoiceIds: ['b'],
      hints: [{ text: 'هل يعمل الكود؟' }],
      feedback: {
        default: { correct: false, what: 'خطأ', why: 'لو كان Syntax Error لما اشتغل الكود.', nextStep: 'اختر Semantics Error.' },
        b: { correct: true, what: 'صحيح', why: 'Semantics = خطأ في المنطق رغم عمل الكود.', nextStep: 'انتهى Boss.' }
      }
    }
  ]
};

export default session;
