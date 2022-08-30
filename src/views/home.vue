<template>
  <div class="home">
    <header class="home-header">
      <span>{{ dateFormat(date) }}</span>
    </header>

    <section class="home-section">
      <!-- 全厂总用电量 -->
      <div class="all">
        <div>{{ totalAmount | money }}</div>
        <div>{{ yearAmount | money }}</div>
        <div>{{ dateAmount | money }}</div>
      </div>
      <!-- 光伏发电 -->
      <div class="gffd">
        <div>{{ gfInModel.totalAmount | money }}</div>
        <div>{{ gfInModel.yearAmount | money }}</div>
        <div>{{ gfInModel.dateAmount | money }}</div>
      </div>
      <!-- 光伏倒送 -->
      <div class="gfds">
        <div>{{ gfOutModel.totalAmount | money }}</div>
        <div>{{ gfOutModel.yearAmount | money }}</div>
        <div>{{ gfOutModel.dateAmount | money }}</div>
      </div>
      <!-- 市电 -->
      <div class="sd">
        <div>{{ cyUseModel.totalAmount | money }}</div>
        <div>{{ cyUseModel.yearAmount | money }}</div>
        <div>{{ cyUseModel.dateAmount | money }}</div>
      </div>

      <!-- 锂电充电 -->
      <div class="ldcd">
        <div>{{ ldInModel.totalAmount | money }}</div>
        <div>{{ ldInModel.yearAmount | money }}</div>
        <div>{{ ldInModel.dateAmount | money }}</div>
      </div>
      <!-- 锂电放电 -->
      <div class="ldfd">
        <div>{{ ldOutModel.totalAmount | money }}</div>
        <div>{{ ldOutModel.yearAmount | money }}</div>
        <div>{{ ldOutModel.dateAmount | money }}</div>
      </div>

      <!-- 液流充电 -->
      <div class="ylcd">
        <div>{{ ylInModel.totalAmount | money }}</div>
        <div>{{ ylInModel.yearAmount | money }}</div>
        <div>{{ ylInModel.dateAmount | money }}</div>
      </div>
      <!-- 液流放电 -->
      <div class="ylfd">
        <div>{{ ylOutModel.totalAmount | money }}</div>
        <div>{{ ylOutModel.yearAmount | money }}</div>
        <div>{{ ylOutModel.dateAmount | money }}</div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data () {
    return {
      date: new Date(),
      gfInModel: { // 光伏发电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      }, 
      gfOutModel: {
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      },
      cyUseModel: { // 市用电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      }, 
      ldInModel: { // 锂电充电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      }, 
      ldOutModel: { // 锂电放电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      }, 
      ylInModel: { // 液流充电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      }, 
      ylOutModel: { // 液流放电
        dateAmount: 0,
        totalAmount: 0,
        yearAmount: 0
      } 
    }
  },
  created() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(() => {
      this.date = new Date()
    }, 1000)
    this.startInterval()
    this.getData()
  },
  methods: {
    async getData() {
      const result = await this.$http.get('/cx/allDataCount/getAllAmount')
      // console.log(result.data.data);
      const { gfInModel, gfOutModel, cyUseModel, ldInModel, ldOutModel, ylInModel, ylOutModel } = result.data.data
      this.gfInModel = gfInModel
      this.gfOutModel = gfOutModel
      this.cyUseModel = cyUseModel
      this.ldInModel = ldInModel
      this.ldOutModel = ldOutModel
      this.ylInModel = ylInModel
      this.ylOutModel = ylOutModel
    },
    dateFormat(time) {
      var date=new Date(time)
      var year=date.getFullYear()
      var month= date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
      var day=date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
      var hours=date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
      var minutes=date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      var seconds=date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
    },
    startInterval() {
      if(this.timeData) {
        clearInterval(this.timeData)
      }
      this.timeData = setInterval(() => {
        this.getData()
      }, 5*60*1000)
    }
  },
  computed: {
    totalAmount() {
      return this.gfInModel.totalAmount - this.gfOutModel.totalAmount + this.cyUseModel.totalAmount + this.ldOutModel.totalAmount + this.ylOutModel.totalAmount
    },
    yearAmount() {
      return this.gfInModel.yearAmount - this.gfOutModel.yearAmount + this.cyUseModel.yearAmount + this.ldOutModel.yearAmount + this.ylOutModel.yearAmount
    },
    dateAmount() {
      return this.gfInModel.dateAmount - this.gfOutModel.dateAmount + this.cyUseModel.dateAmount + this.ldOutModel.dateAmount + this.ylOutModel.dateAmount
    },
  },
  beforeDestroy() {
    clearInterval(this.timer)
    clearInterval(this.timeData)
  }
}
</script>

<style lang="scss" scoped>
  .home {
    position: relative;
    .home-header {
      span {
        position: absolute;
        font-size: 34px;
        top: 110px;
        left: 826px;
      }
    }
    .home-section {
      font-size: 30px;
      .all { 
        :first-child {
          position: absolute;
          top: 300px;
          left: 218px;
        }
        :nth-child(2) {
          position: absolute;
          top: 402px;
          left: 218px;
        }
        :last-child {
          position: absolute;
          top: 502px;
          left: 218px;
        }
      }
      
      .gffd { // 光伏发电
        :first-child {
          position: absolute;
          top: 300px;
          left: 708px;
        }
        :nth-child(2) {
          position: absolute;
          top: 402px;
          left: 708px;
        }
        :last-child {
          position: absolute;
          top: 502px;
          left: 708px;
        }
      }

      .gfds { // 光伏倒送 
        :first-child {
          position: absolute;
          top: 300px;
          right: 712px;
        }
        :nth-child(2) {
          position: absolute;
          top: 402px;
          right: 712px;
        }
        :last-child {
          position: absolute;
          top: 502px;
          right: 712px;
        }
      }

      .sd { // 市电
        :first-child {
          position: absolute;
          top: 300px;
          right: 219px;
        }
        :nth-child(2) {
          position: absolute;
          top: 402px;
          right: 219px;
        }
        :last-child {
          position: absolute;
          top: 502px;
          right: 219px;
        }
      }

      .ldcd { // 锂电充电
        :first-child {
          position: absolute;
          top: 752px;
          left: 266px;
        }
        :nth-child(2) {
          position: absolute;
          top: 852px;
          left: 266px;
        }
        :last-child {
          position: absolute;
          top: 952px;
          left: 266px;
        }
      }

      .ldfd { // 锂电放电
        :first-child {
          position: absolute;
          top: 752px;
          right: 1154px;
        }
        :nth-child(2) {
          position: absolute;
          top: 852px;
          right: 1154px;
        }
        :last-child {
          position: absolute;
          top: 952px;
          right: 1154px;
        }
      }

      .ylcd { // 液流充电
        :first-child {
          position: absolute;
          top: 752px;
          left: 1162px;
        }
        :nth-child(2) {
          position: absolute;
          top: 852px;
          left: 1162px;
        }
        :last-child {
          position: absolute;
          top: 952px;
          left: 1162px;
        }
      }

      .ylfd { // 液流放电
        :first-child {
          position: absolute;
          top: 752px;
          right: 265px;
        }
        :nth-child(2) {
          position: absolute;
          top: 852px;
          right: 265px;
        }
        :last-child {
          position: absolute;
          top: 952px;
          right: 265px;
        }
      }
    }
  }
</style>