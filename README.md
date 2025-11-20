# my-cocos-lib
my-cocos-lib
# install 
npm install

# 将工作上用到的库总结出来，方便以后使用

# typescript 算法库
MyLib/
├── InfiniteList/
│   ├── InfiniteCell.ts
│   ├── InfiniteCell.ts.meta
│   ├── InfiniteList.ts
│   └── InfiniteList.ts.meta
├── Manager/
│   ├── PoolManager.ts
│   ├── PoolManager.ts.meta
│   ├── ResourceUtil.ts
│   ├── ResourceUtil.ts.meta
│   ├── UIManager.ts
│   └── UIManager.ts.meta
├── UI/
│   ├── Tip/
│   │   ├── commontips01.png
│   │   ├── commontips01.png.meta
│   │   ├── TextTip.ts
│   │   └── TextTip.ts.meta
│   └── Tip.meta
├── Utility/
│   ├── Net/
│   │   ├── PublicIP.ts
│   │   └── PublicIP.ts.meta
│   ├── Algorithm.ts
│   ├── Algorithm.ts.meta
│   ├── BindableProperty.ts
│   ├── BindableProperty.ts.meta
│   ├── Debug.ts
│   ├── Debug.ts.meta
│   ├── EventManager.ts
│   ├── EventManager.ts.meta
│   ├── List.ts
│   ├── List.ts.meta
│   ├── Net.meta
│   ├── PipelineContext.ts
│   ├── PipelineContext.ts.meta
│   ├── Validator.ts
│   └── Validator.ts.meta
├── InfiniteList.meta
├── Manager.meta
├── UI.meta
└── Utility.meta


# 参考目录
my-cocos-library/
├── 📁 assets/                  # 核心资源目录
│   ├── 📁 prefabs/            # 预制体
│   ├── 📁 scenes/             # 示例场景
│   ├── 📁 textures/           # 纹理图片
│   ├── 📁 materials/          # 材质
│   ├── 📁 models/             # 3D模型
│   └── 📁 sounds/             # 音效
├── 📁 scripts/                # 核心脚本目录
│   ├── 📁 core/               # 核心框架
│   │   ├── 📁 manager/        # 管理器
│   │   ├── 📁 utils/          # 工具类
│   │   ├── 📁 event/          # 事件系统
│   │   └── 📁 config/         # 配置系统
│   ├── 📁 gameplay/           # 游戏玩法
│   │   ├── 📁 character/      # 角色相关
│   │   ├── 📁 ui/             # UI组件
│   │   ├── 📁 skills/         # 技能系统
│   │   └── 📁 items/          # 道具系统
│   ├── 📁 common/             # 通用组件
│   │   ├── 📁 animation/      # 动画组件
│   │   ├── 📁 effects/        # 特效组件
│   │   └── 📁 tween/          # 缓动组件
│   └── 📁 types/              # 类型定义
├── 📁 resources/              # 动态加载资源
├── 📁 extensions/             # 编辑器扩展
├── 📁 docs/                   # 文档
│   ├── 📁 api/                # API文档
│   ├── 📁 examples/           # 示例说明
│   └── 📁 tutorials/          # 教程
├── 📁 tests/                  # 测试
│   ├── 📁 unit/               # 单元测试
│   └── 📁 integration/        # 集成测试
├── 📁 build/                  # 构建输出
├── 📁 third-party/            # 第三方库
├── 📄 package.json           # 项目配置
├── 📄 tsconfig.json          # TypeScript配置
└── 📄 README.md              # 项目说明