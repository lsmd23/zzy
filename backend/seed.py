"""
Seed script: populate the database with initial journal and article data.
Run once after DB tables are created: python seed.py
"""
from database import SessionLocal, engine
import models

models.Base.metadata.create_all(bind=engine)

JOURNALS = [
    {
        "id": "zi-ran",
        "title": "《孜然》",
        "sub_title": "(Nature - BBQ Edition)",
        "field": "自然与烧烤科学",
        "impact_factor": "999.9",
        "publisher": "撸串联合大学出版社",
        "frequency": "月发 (取决于夜市开门情况)",
        "description": "国际顶级综合性孜然撒放学期刊。致力于将烧烤的手法提升到分子层面，解析辣椒面中氨基酸序列的味觉表达。",
    },
    {
        "id": "liao-xue",
        "title": "《料学》",
        "sub_title": "(Science of Ingredients)",
        "field": "食品炼化学",
        "impact_factor": "888.8",
        "publisher": "调料研究所",
        "frequency": "季刊",
        "description": "汇聚前沿八角、桂皮与香叶的研究成果。",
    },
    {
        "id": "xi-jun",
        "title": "《细菌》",
        "sub_title": "(Cell - Spoiled Edition)",
        "field": "生命倒推科学",
        "impact_factor": "777.7",
        "publisher": "发霉食品研究院",
        "frequency": "不定期",
        "description": "聚焦饭菜放久了之后微观世界的演变。",
    },
    {
        "id": "se-hui",
        "title": "《涩会科学研究》",
        "sub_title": "(Awkward Social Science)",
        "field": "人类尴尬学",
        "impact_factor": "233.3",
        "publisher": "社恐互助协会",
        "frequency": "双月刊",
        "description": "致力于研究社恐人群的各种发病机制与社死瞬间。",
    },
    {
        "id": "zzy-center",
        "title": "《zzy生命科学研究中心学报》",
        "sub_title": "(ZZY Bio-Center Journal)",
        "field": "顶级整活学",
        "impact_factor": "MAX",
        "publisher": "zzy整活委员会",
        "frequency": "不定时抽风 (看心情)",
        "description": "核心收录，权威发布，震撼整个学术圈的学术旗舰。在这里，生命的真谛就是没有真谛。",
    },
]

ARTICLES = [
    # 孜然
    {"title": "烧烤摊社交中啤酒碰杯的最佳物理角度及声学响应", "authors": "王大漂亮", "journal_id": "zi-ran", "published_date": "2025-05-20", "citations": 120, "downloads": 980},
    {"title": "论韭菜与金针菇在铁板上的吸油动力学", "authors": "张烤神", "journal_id": "zi-ran", "published_date": "2025-04-18", "citations": 89, "downloads": 670},
    {"title": "孜然与辣椒粉黄金配比的量子力学诠释", "authors": "李撒料 ; 赵孜然", "journal_id": "zi-ran", "published_date": "2025-03-01", "citations": 201, "downloads": 2100},
    {"title": "高温对细菌繁殖的影响及烧烤火候研究", "authors": "胡炭火", "journal_id": "zi-ran", "published_date": "2025-06-10", "citations": 315, "downloads": 3300},
    # 料学
    {"title": "八角在红烧肉中的角色认知与身份认同困境", "authors": "周八角", "journal_id": "liao-xue", "published_date": "2025-02-14", "citations": 44, "downloads": 320},
    {"title": "桂皮：香料界的007及其秘密任务", "authors": "吴桂皮", "journal_id": "liao-xue", "published_date": "2025-01-08", "citations": 67, "downloads": 410},
    # 细菌
    {"title": "隔夜外卖微生物群落的社会结构分析", "authors": "郑发霉 ; 冯坏掉", "journal_id": "xi-jun", "published_date": "2024-12-20", "citations": 532, "downloads": 5500},
    {"title": "冰箱里待了三个月的剩饭：一个文明的兴衰史", "authors": "王剩饭", "journal_id": "xi-jun", "published_date": "2025-01-31", "citations": 888, "downloads": 9999},
    # 涩会
    {"title": "宿舍群消息已读不回的社会心理学机制", "authors": "李社恐 ; 张摸鱼", "journal_id": "se-hui", "published_date": "2025-04-01", "citations": 233, "downloads": 1234},
    {"title": "当代青年在超市排队时掏出手机的行为动机研究", "authors": "陈低头", "journal_id": "se-hui", "published_date": "2025-05-05", "citations": 101, "downloads": 888},
    # zzy-center
    {"title": "当代青年半夜不睡刷视频导致多巴胺过度分泌的综合治理", "authors": "李卷猪 ; 赵摸鱼", "journal_id": "zzy-center", "published_date": "2026-02-28", "citations": 9999, "downloads": 99999},
    {"title": "zzy生科院食堂菜系演变对学生体质及精神状态的深远影响", "authors": "干饭人", "journal_id": "zzy-center", "published_date": "2026-01-15", "citations": 8888, "downloads": 88888},
    {"title": "母猪的产后护理研究综述与展望", "authors": "张三猪 ; 李四狗", "journal_id": "zzy-center", "published_date": "2025-11-11", "citations": 6666, "downloads": 66666},
    {"title": "孜然与料学的终极配比：来自宇宙的最后答案", "authors": "终极撒料者", "journal_id": "zzy-center", "published_date": "2025-09-09", "citations": 4242, "downloads": 42000},
]


def seed():
    db = SessionLocal()
    try:
        # Only seed if journals table is empty
        if db.query(models.Journal).count() > 0:
            print("数据库已有数据，跳过种子填充。")
            return

        for j in JOURNALS:
            db.add(models.Journal(**j))
        db.commit()
        print(f"✅ 已写入 {len(JOURNALS)} 个期刊。")

        for a in ARTICLES:
            db.add(models.Article(**a))
        db.commit()
        print(f"✅ 已写入 {len(ARTICLES)} 篇文章。")

    finally:
        db.close()


if __name__ == "__main__":
    seed()
    print("🐷 种子数据填充完成！")
