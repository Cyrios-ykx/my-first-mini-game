import Animation from '../base/animation'
import DataBus from '../databus'

const ENEMY_IMG_SRC = 'images/enemy.png'
const ENEMY_WIDTH = 60
const ENEMY_HEIGHT = 60

const __ = {
  speed: Symbol('speed'),
}

const AllEnemy = {
  normal: {
    speed: 6,
    vitality: 1,
    enemyScore: 1,
  },
  elite: {
    speed: 3,
    vitality: 2,
    enemyScore: 100,
    width: 120,
    height: 120,
  },
}

const databus = new DataBus()

function rnd(start, end) {
  return Math.floor(Math.random() * (end - start) + start)
}

export default class Enemy extends Animation {
  constructor(enemyType) {
    const enemyInfo = AllEnemy[enemyType]
    const width = enemyInfo.width ?? ENEMY_WIDTH
    const height = enemyInfo.height ?? ENEMY_HEIGHT

    super(ENEMY_IMG_SRC, width, height)

    this.vitality = enemyInfo.vitality
    this.enemyScore == enemyInfo.enemyScore
    this.enemyWidth = width
    this.initExplosionAnimation()
  }

  init() {
    this.x = rnd(0, window.innerWidth - this.enemyWidth)
    this.y = -this.height
    this[__.speed] = enemyInfo.speed

    this.visible = true
  }

  vitalityDeduction(value) {
    this.vitality = this.vitality - value
  }

  // 预定义爆炸的帧动画
  initExplosionAnimation() {
    const frames = []

    const EXPLO_IMG_PREFIX = 'images/explosion'
    const EXPLO_FRAME_COUNT = 19

    // 插入了一个爆炸的图片
    for (let i = 0; i < EXPLO_FRAME_COUNT; i++) {
      frames.push(`${EXPLO_IMG_PREFIX + (i + 1)}.png`)
    }

    this.initFrames(frames)
  }

  // 每一帧更新敌人位置
  update() {
    this.y += this[__.speed]

    // 对象回收
    if (this.y > window.innerHeight + this.height) databus.removeEnemey(this)
  }
}
