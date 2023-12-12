module ApplicationHelper
  def body_classes
    @body_classes ||= []
    @body_classes.join(' ')
  end
end
