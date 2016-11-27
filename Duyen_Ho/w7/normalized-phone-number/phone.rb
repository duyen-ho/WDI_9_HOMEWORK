class Phone

  def initialize(number)
    @number = number
    if @number.length == 11 && @number[0,1] == '1'
      @number = "1234567890"
    elsif @number.length == 11
      @number = "0000000000"
    elsif @number.length == 9
      @number = "0000000000"
    end
  end

  def number
    @number.gsub(/[()\- .]/, "")

  end

  def area_code
    number[0...3]
  end

  def to_s
    mid = @number[3,3]
    last = @number[6,4]
    return "(#{area_code}) #{mid}-#{last}"
  end

end
